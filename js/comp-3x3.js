function comp_play(){
    var filled = parseInt(document.getElementById("filled_blocks").innerHTML);
    if(filled > 9) {
        draw();
    } else {
        var positions = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
        var x_p = document.getElementById("x_pos").innerHTML.split(",");
        var o_p = document.getElementById("o_pos").innerHTML.split(",");
        var a = [];
        var i = 0;
        var len_p = positions.length;
        while(i < len_p) {
            if(x_p.includes(positions[i]) == false) {
                if(o_p.includes(positions[i]) == false) {
                    a.push(positions[i]);
                }
            }
            i += 1;
        }
        var len_a = a.length;
        if(x_p.length < 3) {
            var random = Math.floor((Math.random()*len_a) + 1) - 1;
            var hor = a[random][0];
            var ver = a[random][1];
            draw_O(hor,ver);
        } else {
            var i = 0;
            var j = 0;
            var xlines = [];
            var xpos = [];
            var olines = [];
            var opos = [];
            while(i < len_a) {
                olines = o_p;
                olines.push(a[i]);
                var res = check_line(olines);
                if(res.length > 0) {
                    opos.push(a[i]);
                }
                i += 1;
                olines.pop();
            }
            if(opos.length > 0) {
                var hor = opos[0][0];
                var ver = opos[0][1];
                draw_O(hor,ver);
            } else {
                while(j < len_a) {
                    xlines = x_p;
                    xlines.push(a[j]);
                    var res = check_line(xlines);
                    if(res.length > 0) {
                        xpos.push(a[j]);
                    }
                    j += 1;
                    xlines.pop();
                }
                if(xpos.length > 0) {
                    var hor = xpos[0][0];
                    var ver = xpos[0][1];
                    draw_O(hor,ver);
                } else {
                    var t = 0;
                    var op = o_p;
                    var oran = "";
                    while(t < 20) {
                        var r1 = Math.floor((Math.random()*len_a) + 1) - 1;
                        var r2 = Math.floor((Math.random()*len_a) + 1) - 1;
                        var r3 = Math.floor((Math.random()*len_a) + 1) - 1;
                        op.push(a[r1]);
                        op.push(a[r2]);
                        var rep = check_line(op);
                        if(rep.length > 0) {
                            oran = a[r2];
                            t = 20;
                        } else {
                            op.push(a[r3]);
                            var rek = check_line(op);
                            if(rek.length > 0) {
                                oran = a[r2];
                                t = 20
                            }
                            op.pop();
                        }
                        op.pop();
                        op.pop();
                        t += 1;
                    }
                    if(oran == "") {
                        var random = Math.floor((Math.random()*len_a) + 1) - 1;
                        var hor = a[random][0];
                        var ver = a[random][1];
                        draw_O(hor,ver);
                    } else {
                        var hor = oran[0];
                        var ver = oran[1];
                        draw_O(hor,ver);
                    }
                }
            }
        }
        var marko = document.getElementById("o_pos").innerHTML.split(",");
        var lino = check_line(marko);
        if(lino.length > 0) {
            redLine(lino, "o");
            finish("o");
        } else {
            filled = parseInt(document.getElementById("filled_blocks").innerHTML);
            if(filled > 9) {
                draw();
            }
        }
    }
}