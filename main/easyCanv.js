/*
By: Ianyourgod
 _._     _,-'""`-._
(,-.`._,'(       |\`-/|
    `-.-' \ )-`( , o o)
          `-    \`_`"'-
*/

class canvas {
    constructor(id,w,h,bgcolor="#FFFFFF",location=document.body) {
        // creates a canvas element
        this.canv = document.createElement("canvas");
        this.canv.id = id;
        this.canv.width = w-50;
        this.canv.height = h-50;
        // list of objects for rendering
        this.objects = [];
        // context
        this.ctx = this.canv.getContext("2d");
        this.canv.style.backgroundColor = bgcolor;
        // puts the canvas on the screen
        location.appendChild(this.canv);
    }
    draw() {
        // updates the screen
        this.ctx.clearRect(0,0,this.canv.width,this.canv.height);
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }
    }
    checkCollisions() {
        // goes through list of objects then runs the method "allCollisions" if it exists
        let allCols = [] 
        for (var i = 0; i < this.objects.length; i++) {
            if (typeof this.objects[i].allCollisions === "function") {
                allCols.push(this.objects[i].allCollisions());
            }
        }
        return allCols
    }
    update() {
        // collisions and updates canvas, then returns list of all collisions
        let allCols = this.checkCollisions();
        this.draw();
        return allCols
    }
}
class Object {
    constructor(x,y,w,h,canvas,color="#000000") {
     // simple cube object with a x,y,width,height,and color. Also stores the canvas and puts it self on the canvas's object list
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        canvas.objects.push(this);
        this.ctx.fillStyle = color;
    }
    draw() {
        // draws itself
        this.ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    collision(x,y,w,h) {
     // checks collision with another object
        if (x+w > this.x && x < this.x+this.w && y+h > this.y && y < this.y+this.h) {
            return true;
        }
        return false;
    }
    allCollisions(x,y,w,h) {
        // gets list of collisions
        var collisions = [];
        for (var i = 0; i < this.canvas.objects.length; i++) {
            if (this.canvas.objects[i] != this && typeof this.canvas.objects[i].collision === "function" && typeof this.canvas.objects[i] === "Object") {
                if (this.canvas.objects[i].collision(x,y,w,h)) {
                    collisions.push(this.canvas.objects[i]);
                }
            }
        }
        return collisions;
    }
}
class Circle {
    constructor(x,y,r,canvas,color="#000000") {
     // simple circle object, stores x,y,r,and canvas. Puts itself on the canvas's object list
        this.x = x;
        this.y = y;
        this.r = r;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.color = color;
        canvas.objects.push(this);
    }
    draw() {
     // draws itself
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
    }
    collision(x,y,r) {
     // checks for collision with other circle
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
    constructor(x1,y1,x2,y2,canvas,color="#000000") {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        canvas.objects.push(this);
    }
    draw() {
        this.ctx.fillStyle = this.color;
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
    constructor(x,y,text,canvas,size=undefined,color="#000000") {
        this.x = x;
        this.y = y;
        this.text = text;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.size = size
        this.color = color;
        canvas.objects.push(this);
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.font = this.size+"px Arial";
        this.ctx.fillText(this.text,this.x,this.y);
    }
}
