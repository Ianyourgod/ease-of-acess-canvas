/*
 _._     _,-'""`-._
(,-.`._,'(       |\`-/|
    `-.-' \ )-`( , o o)
          `-    \`_`"'-
*/

class canvas {
    constructor(id,w,h) {
        this.canv = document.createElement("canvas");
        this.canv.id = id;
        this.canv.width = w-50;
        this.canv.height = h-50;
        this.objects = [];
        this.ctx = this.canv.getContext("2d");
        document.body.appendChild(this.canv);
    }
    draw() {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }
    }
    checkCollisions() {
        for (var i = 0; i < this.objects.length; i++) {
            if (typeof this.objects[i].allCollisions === "function") {
                this.objects[i].allCollisions();
            }
        }
    }
    update() {
        this.checkCollisions();
        this.draw();
    }
}
class Object {
    constructor(x,y,w,h,canvas) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        canvas.objects.push(this);
    }
    draw() {
        this.ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    collision(x,y,w,h) {
        if (x+w > this.x && x < this.x+this.w && y+h > this.y && y < this.y+this.h) {
            return true;
        }
        return false;
    }
    allCollisions(x,y,w,h) {
        var collisions = [];
        for (var i = 0; i < this.canvas.objects.length; i++) {
            if (this.canvas.objects[i] != this && typeof this.canvas.objects[i].collision === "function") {
                if (this.canvas.objects[i].collision(x,y,w,h)) {
                    collisions.push(this.canvas.objects[i]);
                }
            }
        }
        return collisions;
    }
}
class Circle {
    constructor(x,y,r,canvas) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        canvas.objects.push(this);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
    }
    collision(x,y,r) {
        var dist = Math.sqrt(Math.pow(x-this.x,2)+Math.pow(y-this.y,2));
        if (dist < r+this.r) {
            return true;
        }
        return false;
    }
    allCollisions(x,y,r) {
        var collisions = [];
        for (var i = 0; i < this.canvas.objects.length; i++) {
            if (this.canvas.objects[i] != this) {
                if (this.canvas.objects[i].collision(x,y,r)) {
                    collisions.push(this.canvas.objects[i]);
                }
            }
        }
        return collisions;
    }
}
class Line {
    constructor(x1,y1,x2,y2,canvas) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        canvas.objects.push(this);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1,this.y1);
        this.ctx.lineTo(this.x2,this.y2);
        this.ctx.stroke();
    }
    collision(x,y,w,h) {
        var dist = Math.abs((this.y2-this.y1)*x-(this.x2-this.x1)*y+this.x2*this.y1-this.y2*this.x1)/Math.sqrt(Math.pow(this.y2-this.y1,2)+Math.pow(this.x2-this.x1,2));
        if (dist < Math.max(w,h)) {
            return true;
        }
        return false;
    }
    allCollisions(x,y,w,h) {
        var collisions = [];
        for (var i = 0; i < this.canvas.objects.length; i++) {
            if (this.canvas.objects[i] != this) {
                if (this.canvas.objects[i].collision(x,y,w,h)) {
                    collisions.push(this.canvas.objects[i]);
                }
            }
        }
        return collisions;
    }
}
class Text {
    constructor(x,y,text,canvas,size=undefined) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.size = size
        canvas.objects.push(this);
    }
    draw() {
        this.ctx.font = this.size+"px Arial";
        this.ctx.fillText(this.text,this.x,this.y);
    }
}
