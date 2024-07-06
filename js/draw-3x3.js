// To draw the 3x3 Board
function draw_board() {
    var board = document.getElementById("board");
    var ct = board.getContext("2d");
    ct.fillStyle = "gray";
    ct.fillRect(0,98,300,6);
    ct.fillRect(0,196,300,6);
    ct.fillRect(98,0,6,300);
    ct.fillRect(196,0,6,300);
}

// To draw X
function draw_X(hor,ver) {
    var x1 = 0;
    var x2 = 0;
    var x3 = 0;
    var x4 = 0;
    var y1 = 0;
    var y2 = 0;
    var y3 = 0;
    var y4 = 0;
    if(hor == "a") {
        x1 = x4 = 26;
        x2 = x3 = 78;
    } else if(hor == "b") {
        x1 = x4 = 124;
        x2 = x3 = 176;
    } else if(hor == "c") {
        x1 = x4 = 222;
        x2 = x3 = 274;
    }
    if(ver == "1") {
        y1 = y3 = 26;
        y2 = y4 = 78;
    } else if(ver == "2") {
        y1 = y3 = 124;
        y2 = y4 = 176;
    } else if(ver == "3") {
        y1 = y3 = 222;
        y2 = y4 = 274;
    }
    animate_X(x1,y1,x2,y2,1);
    animate_X(x3,y3,x4,y4,2);
    addPos = document.getElementById("x_pos").innerHTML;
    addPos = addPos + hor + ver + ",";
    document.getElementById("x_pos").innerHTML = addPos;
    conduct_check("x");
}

// For Animating X
function animate_X(a,b,c,d) {
    var board = document.getElementById("board");
    var ctx = board.getContext("2d");
    ctx.strokeStyle = "cadetblue";
    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(c,d);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();    
}

// For drawing O
function draw_O(hor, ver) {
    var board = document.getElementById("board");
    var cx = board.getContext("2d");
    var x = 0;
    var y = 0;
    cx.strokeStyle = "slategray";
    if(hor == "a") {
        x = 52;
    } else if(hor == "b") {
        x = 150;
    } else if(hor == "c") {
        x = 248;
    };
    if(ver == "1") {
        y = 52;
    } else if(ver == "2") {
        y = 150;
    } else if(ver == "3") {
        y = 248;
    };
    cx.beginPath();
    cx.arc(x,y,26,0,2*Math.PI);
    cx.lineWidth = 10;
    cx.stroke();
    cx.closePath();

    addPos = document.getElementById("o_pos").innerHTML;
    addPos = addPos + hor + ver + ",";
    document.getElementById("o_pos").innerHTML = addPos;
    conduct_check("o");
}

function redLine(lin, p) {
    var board = document.getElementById("board");
    var tx = board.getContext("2d");
    tx.strokeStyle = "black";
    tx.beginPath();
    var linnum = lin.length;
    var i = 0;
    while(i < linnum && linnum > 0) {
        if(lin[i] == "line1") {
            tx.moveTo(52,0);
            tx.lineTo(52,300);
        } else if(lin[i] == "line2") {
            tx.moveTo(150,0);
            tx.lineTo(150,300);
        } else if(lin[i] == "line3") {
            tx.moveTo(248,0);
            tx.lineTo(248,300);
        } else if(lin[i] == "line4") {
            tx.moveTo(0,52);
            tx.lineTo(300,52);
        } else if(lin[i] == "line5") {
            tx.moveTo(0,150);
            tx.lineTo(300,150);
        } else if(lin[i] == "line6") {
            tx.moveTo(0,248);
            tx.lineTo(300,248);
        } else if(lin[i] == "line7") {
            tx.moveTo(10,10);
            tx.lineTo(290,290);
        } else if(lin[i] == "line8") {
            tx.moveTo(290,10);
            tx.lineTo(10,290);
        }
        i += 1;
    }
    tx.lineWidth = 5;
    tx.stroke();
    tx.closePath();
    conduct_finish(p, lin, linnum);
}