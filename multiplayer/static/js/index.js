class obj {
    constructor(x,y,width,height,hexColor,canvasId) {
        this.x = x
        this.y = y
        this.w = width
        this.h = height
        this.ci = canvasId
        this.color = hexColor
        let canvas = document.getElementById(canvasId)
        let ctx = canvas.getContext("2d")
        ctx.fillStyle = hexColor;
        ctx.fillRect(x, y, width, height);
    }
    _update() {
        let ctx = document.getElementById(this.ci).getContext("2d")
        ctx.clearRect(this.x,this.y,this.w,this.h)
    }
    goto(x,y) {
        let ctx = document.getElementById(this.ci).getContext("2d")
        this._update()
        this.x = x
        this.y = y
        ctx.fillStyle=this.color
        ctx.fillRect(x,y,this.w,this.h)
    }
    move(xAmount=0,yAmount=0) {
        this.goto(this.x + xAmount, this.y + yAmount)
    }
    resize(width,height) {
        this._update()
        let ctx = document.getElementById(this.ci).getContext("2d")
        this.w = width
        this.h = height
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,width,height)
    }
    update() {
        let ctx = document.getElementById(this.ci).getContext("2d")
        this._update()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
    touchingObject(object) {
        object = type.objs[i]
        let x11 = this.x;
        let x12 = this.x + this.w;
        let y11 = this.y;
        let y12 = this.y + this.h;
        let x21 = object.x;
        let x22 = object.x + object.w;
        let y21 = object.y;
        let y22 = object.y + object.h;
        if ((x11 > x21 && x11 < x22) || (x12 > x21 && x12 < x22)) {
            if ((y11 > y21 && y11 < y22) || (y12 > y21 && y12 < y22)) {
                return true;
            }
        }
        return false
    }
    touching(type) {
        let object;
        for (var i=0;i<type.objs.length;i++) {
            object = type.objs[i]
            let x11 = this.x;
            let x12 = this.x + this.w;
            let y11 = this.y;
            let y12 = this.y + this.h;
            let x21 = object.x;
            let x22 = object.x + object.w;
            let y21 = object.y;
            let y22 = object.y + object.h;
            if ((x11 > x21 && x11 < x22) || (x12 > x21 && x12 < x22)) {
                if ((y11 > y21 && y11 < y22) || (y12 > y21 && y12 < y22)) {
                    return true;
                } 
            } 
        }
        return false;
    }
    touchingEdge() {
        let width = document.getElementById(this.ci).width
        let height = document.getElementById(this.ci).height
        let x11 = this.x;
        let x12 = this.x + this.w;
        let y11 = this.y;
        let y12 = this.y + this.h;
        if (x11 < 0) {
            return "left"
        }
        if (x12 > width) {
            return 'right'
        }
        if (y11 < 0) {
            return 'top'
        }
        if (y12 > height) {
            return 'bottom'
        }
        return "none"
    }
}
class type {
    constructor(...objs) {
        this.objs = []
        for (let i=0; i<objs.length; i++) {
            this.objs.push(objs[i])
        };
    }
    add(...objs) {
        for (let i=0; i<objs.length; i++) {
            this.objs.push(objs[i])
        };
    }
    color(hexColor) {
        for (let i=0; i<this.objs.length; i++) {
            this.objs[i].color = hexColor
            this.objs[i].update()
        };
    }
    touching(type) {
        let object;
        let obje;
        for (var a=0;a<this.objs;a++) {
            obje = this.objs[a]
            for (var i=0;i<type.objs.length;i++) {
                object = type.objs[i]
                let x11 = obje.x;
                let x12 = obje.x + obje.w;
                let y11 = obje.y;
                let y12 = obje.y + obje.h;
                let x21 = object.x;
                let x22 = object.x + object.w;
                let y21 = object.y;
                let y22 = object.y + object.h;
                if ((x11 > x21 && x11 < x22) || (x12 > x21 && x12 < x22)) {
                    if ((y11 > y21 && y11 < y22) || (y12 > y21 && y12 < y22)) {
                        return true;
                    } 
                } 
            }
        }
        return false;
    }
}
/*
 var name   type x y w  h    color  canvas id
    v         v  v v v   v     v        v
let p1 = new obj(0,0,10,10,"#FF0000","canv")
  var name    type  objects(can put multiple)
     v          v   v
let wall = new type(p1)
to catch keypresses                include this         the key that was pressed
                                        v                        v
document.addEventListener('keydown', (event) => {console.log(event.key)})*/
const socket = io();
const players = []
socket.on("new", (color, id) => {
    players.append(new obj(0,0,20,20,color,"canv"))
});
document.addEventListener('keydown', (event) => {
    if (event.key === "w") {
        p1.y -= 1
        console.log(p1.y)
        if (p1.touchingEdge() === "top") {
            p1.y += 1
            console.log(p1.y)
            return;
        }
        p1.y += 1
        p1.move(0,-1)
    }
    if (event.key === "a") {
        p1.x -= 1
        if (p1.touchingEdge() === "left") {
            p1.x += 1
            return
        }
        p1.x += 1
        p1.move(-1)
    }
    if (event.key === "s") {
        p1.y += 1
        if (p1.touchingEdge() === "bottom") {
            p1.y -= 1
            return
        }
        p1.y -= 1
        p1.move(0,1)
    }
    if (event.key === "d") {
        p1.x += 1
        if (p1.touchingEdge() === "right") {
            p1.x -= 1
            return
        }
        p1.x -= 1
        p1.move(1)
    }
})