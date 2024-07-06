// To Mark the Click/Touch
function mark(event) {
    var turn = document.getElementById("turn").innerHTML;
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
    if(hor != "" && ver != "") {
        var valid = getPos(hor+ver);
        if(valid == true) {
            if(turn == "X") {
                draw_X(hor,ver);
                document.getElementById("turn").innerHTML = "O";
                document.getElementById("x_card").style.color = "black";
                document.getElementById("x_card").style.background = "white";
                document.getElementById("o_card").style.color = "white";
                document.getElementById("o_card").style.background = "darkgray";
            } else if(turn == "O") {
                draw_O(hor,ver);
                document.getElementById("turn").innerHTML = "X";
                document.getElementById("o_card").style.color = "black";
                document.getElementById("o_card").style.background = "white";
                document.getElementById("x_card").style.color = "white";
                document.getElementById("x_card").style.background = "cadetblue";
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

// check whether position is available
function getPos(f) {
    var valu = document.getElementById("x_pos").innerHTML;
    var pos = valu.split(",");
    if(pos.includes(f) == true) {
        return false;
    } else {
        valu = document.getElementById("o_pos").innerHTML;
        pos = valu.split(",");
        if(pos.includes(f) == true) {
            return false;
        } else {
            return true;
        }
    }
}

// to check whether any line is forming
function conduct_check(p){
    if(p == "x") {
        var lin = document.getElementById("x_pos").innerHTML;
        var linarr = lin.split(",");
    } else if(p == "o") {
        var lin = document.getElementById("o_pos").innerHTML;
        var linarr = lin.split(",");
    }
    var lineName = [];
    if(linarr.length > 3) {
        lineName = check_line(linarr);
        if(lineName.length > 0) {
            redLine(lineName, p);
        }
    }
    var linelist = ["line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8"];
    if(linelist.includes(lineName[0]) == false) {
        check_draw();
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

// After Game Finishes
function conduct_finish(p, lin, linnum) {
    var linelist = ["line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8"];
    var winner = "";
    if(lin.every(elem => linelist.includes(elem)) == true) {
        if(p == "x") {
            winner = "&#10005;";
            var score = parseInt(document.getElementById("score_x").innerHTML);
            score += linnum;
            document.getElementById("score_x").innerHTML = score;
        } else if(p == "o") {
            winner = "O";
            var score = parseInt(document.getElementById("score_o").innerHTML);
            score += linnum;
            document.getElementById("score_o").innerHTML = score;
        }
        setTimeout(function(){
            document.getElementById("win_modal").style.display = "block";
            document.getElementById("win_name").innerHTML = winner + " Won!";
        }, 1000);
    }
}

// to start a fresh game
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
}

// To check if match was tied
function check_draw(){
    var filled = parseInt(document.getElementById("filled_blocks").innerHTML);
    if(filled < 9) {
        filled += 1;
        document.getElementById("filled_blocks").innerHTML = filled;
    } else {
        setTimeout(function() {
            document.getElementById("win_modal").style.display = "block";
            document.getElementById("win_name").innerHTML = "Match Tied!";
        }, 1000);
    }
}