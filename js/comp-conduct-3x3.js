function mark(event) {
    var turn = document.getElementById("turn").innerHTML;
    if(turn == "X") {
        var x = getCoordinateX(event);
        var y = getCoordinateY(event);
        var hor = "";
        var ver = "";
        if(x > 23 && x < 77) {
            hor = "a";
        } else if(x > 121 && x < 175) {
            hor = "b";
        } else if(x > 219 && x < 273) {
            hor = "c";
        } else {
            hor = "";
        }
        if(y > 23 && y < 77) {
            ver = "1";
        } else if(y > 121 && y < 175) {
            ver = "2";
        } else if(y > 219 && y < 273) {
            ver = "3";
        } else {
            ver = "";
        }
        avail = false;
        if(hor != "" && ver != "") {
            avail = check_availability(hor+ver);
        }
        if(avail == true) {
            draw_X(hor,ver);
            document.getElementById("turn").innerHTML = "O";
            document.getElementById("x_card").style.color = "black";
            document.getElementById("x_card").style.background = "white";
            document.getElementById("o_card").style.color = "white";
            document.getElementById("o_card").style.background = "darkgray";
            var lin = document.getElementById("x_pos").innerHTML;
            var linarr = lin.split(",");
            var lines = check_line(linarr);
            if(lines.length > 0) {
                redLine(lines, "x");
                finish("x");
            } else {
                setTimeout(function(){
                    comp_play();
                    document.getElementById("turn").innerHTML = "X";
                    document.getElementById("x_card").style.color = "white";
                    document.getElementById("x_card").style.background = "cadetblue";
                    document.getElementById("o_card").style.color = "black";
                    document.getElementById("o_card").style.background = "white";
                }, 600);
            }
        } 
    }
}

// To get X coordinate of click
function getCoordinateX(event) {
    // Element's Coordinates
    var elem = document.getElementById("board");
    var ox = elem.offsetLeft;
    // Pointer's Coordinates
    var px = event.clientX;
    // Calculating coordinates of click on element
    var x = px - ox;
    return(x);
}

// To get Y coordinate of click
function getCoordinateY(event) {
    // Element's Coordinates
    var elem = document.getElementById("board");
    var oy = elem.offsetTop;
    // Pointer's Coordinates
    var py = event.clientY;
    // Calculating coordinates of click on element
    var y = py - oy;
    return(y);
}

function check_availability(place) {
    var pp = document.getElementById("x_pos").innerHTML + document.getElementById("o_pos").innerHTML
    var pos = pp.split(",");
    if(pos.includes(place) == true) {
        return false;
    } else {
        return true;
    }
}

// to identify the line (if forming)
function check_line(linarr) {
    var lines = [];
    if(linarr.includes("a1") && linarr.includes("a2") && linarr.includes("a3")) {
      lines.push("line1");
    }
    if(linarr.includes("b1") && linarr.includes("b2") && linarr.includes("b3")) {
      lines.push("line2");
    }
    if(linarr.includes("c1") && linarr.includes("c2") && linarr.includes("c3")) {
      lines.push("line3");
    }
    if(linarr.includes("a1") && linarr.includes("b1") && linarr.includes("c1")) {
      lines.push("line4");
    }
    if(linarr.includes("a2") && linarr.includes("b2") && linarr.includes("c2")) {
      lines.push("line5");
    }
    if(linarr.includes("a3") && linarr.includes("b3") && linarr.includes("c3")) {
      lines.push("line6");
    }
    if(linarr.includes("a1") && linarr.includes("b2") && linarr.includes("c3")) {
      lines.push("line7");
    }
    if(linarr.includes("a3") && linarr.includes("b2") && linarr.includes("c1")) {
      lines.push("line8");
    }
    return lines;
}

// To reward points
function points(q,w) {
    var card = 0;
    if(q == "x") {
        card = parseInt(document.getElementById("score_x").innerHTML);
        card += w;
        document.getElementById("score_x").innerHTML = card;
    } else if(q == "o") {
        card = parseInt(document.getElementById("score_o").innerHTML);
        card += w;
        document.getElementById("score_o").innerHTML = card;
    }
}

// Finish the game and show the modal
function finish(g) {
    var win = "";
    if(g == "x") {
        win = "You";
    } else {
        win = "Computer"
    }
    document.getElementById("win_name").innerHTML = win + " Won!";
    setTimeout(function() {
        document.getElementById("win_modal").style.display = "block";
    }, 1000);
}

// Draw and finish the game
function draw() {
    document.getElementById("win_name").innerHTML = "Match Tied!";
    setTimeout(function() {
        document.getElementById("win_modal").style.display = "block";
    }, 1000);
}

// To start a fresh game
function fresh_game() {
    var turn = document.getElementById("f_turn").innerHTML;
    if(turn == "X") {
        document.getElementById("turn").innerHTML = "O";
        document.getElementById("f_turn").innerHTML = "O";
        document.getElementById("x_card").style.color = "black";
        document.getElementById("x_card").style.background = "white";
        document.getElementById("o_card").style.color = "white";
        document.getElementById("o_card").style.background = "darkgray";
    } else {
        document.getElementById("turn").innerHTML = "X";
        document.getElementById("f_turn").innerHTML = "X";
        document.getElementById("o_card").style.color = "black";
        document.getElementById("o_card").style.background = "white";
        document.getElementById("x_card").style.color = "white";
        document.getElementById("x_card").style.background = "cadetblue";
    }
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,300,300);
    draw_board();
    document.getElementById("x_pos").innerHTML = "";
    document.getElementById("o_pos").innerHTML = "";
    document.getElementById("filled_blocks").innerHTML = 1;
    if(turn == "X") {
        setTimeout(function() {
            comp_play();
            document.getElementById("turn").innerHTML = "X";
            document.getElementById("x_card").style.color = "white";
            document.getElementById("x_card").style.background = "cadetblue";
            document.getElementById("o_card").style.color = "black";
            document.getElementById("o_card").style.background = "white";
        }, 600);
    }
}