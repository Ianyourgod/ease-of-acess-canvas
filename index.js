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
}

function tag() {
    function c(x,x1, w1) {
        return x >= x1 && x <= x1 + w1
    }
    console.log("tag", c(p1.x, p2.x, p2.w))
    if ((c(p1.x, p2.x, p2.w) || c(p1.x + p1.w, p2.x, p2.w)) && (c(p1.y, p2.y, p2.h) || c(p1.y + p1.h, p2.y, p2.w))) {
        let temp = p1.color
        p1.color = p2.color
        p2.color = temp
        p1.update()
        p2.update()
    }
}

document.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    console.log(event.key)
    if (event.key === "w") {
        p1.move(0,-(p1.h/2))
        tag() 
    }
    if (event.key === "a") {
        p1.move(-(p1.w/2))
        tag() 
    }
    if (event.key === "s") {
        p1.move(0,(p1.h/2))
        tag() 
    }
    if (event.key === "d") {
        p1.move((p1.w/2))
        tag() 
    }
    if (event.key === "ArrowUp") {
        p2.move(0,-(p2.h/2))
        tag() 
    }
    if (event.key === "ArrowLeft") {
        p2.move(-(p2.w/2))
        tag() 
    }
    if (event.key === "ArrowDown") {
        p2.move(0,(p2.h/2))
        tag() 
    }
    if (event.key === "ArrowRight") {
        p2.move((p2.w/2))
        tag() 
    }
    /*if(event.key === "Shift") {
        tag()
    }*/
})

spawnx = window.innerWidth - 160
spawny = window.innerHeight - 160

let p1 = new obj(0,0,60,60,'#0d33db','canv')
let p2 = new obj(spawnx,spawny,60,60,'#FF0000','canv')

// game loop
setInterval(function(){
    p1.update()
    p2.update()
},4)