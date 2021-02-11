let obstr = []
let playerPosX = 12
let playerPosY = 5
let prevX = playerPosX
let prevY = playerPosY
let leftBorder = 0, rightBorder = 0
let timeout = 80, i = 0

function fillGrid() {
    let cont = document.querySelector(".container")
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 10; j++) {
            let el = document.createElement("div")
            el.id = i + " " + j
            if (j == 0) {
                el.classList.add("borderPixel")
                el.classList.add("pixel1")
                if (cont) cont.append(el)
            } else
                if (j > 0 && j < 9) {
                    el.classList.add("pixel0")
                    if (cont) cont.append(el)
                }
            if (j == 9) {
                el.classList.add("borderPixel")
                el.classList.add("pixel1")
                if (cont) cont.append(el)
            } else
                if (j > 0 && j < 9) {
                    el.classList.add("pixel0")
                    if (cont) cont.append(el)
                }
        }
    }
}

function randomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

class player {
    constructor(x, y, px, py) {
        this.playerPosX = x
        this.playerPosY = y
        this.prevX = px
        this.prevY = py
    }

    playerModel = [
        { x: 0, y: 0, fill: false }, { x: 0, y: 1, fill: true }, { x: 0, y: 2, fill: false },
        { x: 1, y: 0, fill: true }, { x: 1, y: 1, fill: true }, { x: 1, y: 2, fill: true },
        { x: 2, y: 0, fill: false }, { x: 2, y: 1, fill: true }, { x: 2, y: 2, fill: false },
        { x: 3, y: 0, fill: true }, { x: 3, y: 1, fill: false }, { x: 3, y: 2, fill: true }
    ]

    lastPlayer = []

    draw() {
        let i = 0
        this.lastPlayer = this.playerModel.map(({ x, y, f }) => {
            x += this.playerPosX
            y += this.playerPosY
            f = this.playerModel[i].fill
            this.prevX = this.playerPosX
            this.prevY = this.playerPosY
            i++
            if (f == true) {
                document.getElementById(x + " " + y).classList.remove("pixel0")
                document.getElementById(x + " " + y).classList.add("player")
                document.getElementById(x + " " + y).classList.add("pixel1")
            }
            return { x, y, f }
        })
    }

    delete() {

        let i = 0
        this.playerModel.map(({ x, y, f }) => {
            x += this.prevX
            y += this.prevY
            f = this.playerModel[i].fill
            i++
            if (f == true) {
                document.getElementById(x + " " + y).classList.add("pixel0")
                document.getElementById(x + " " + y).classList.remove("player")
                document.getElementById(x + " " + y).classList.remove("pixel1")
            }
        })
    }

    playerMove(event) {
        if (event.key == 'ArrowRight') {
            if (this.playerPosY < 6) {
                this.playerPosY++
                this.delete()
                this.draw()
            }
        }
        if (event.key == 'ArrowLeft') {
            if (this.playerPosY > 1) {
                this.playerPosY--
                this.delete()
                this.draw()
            }
        }
    }

    playerCheck() {
        if (document.getElementById(this.playerPosX + " " + (this.playerPosY - 1)).matches(".borderPixel")) {
            return "leftBorder"
        }
        else if (document.getElementById(this.playerPosX + " " + (this.playerPosY + 3)).matches(".borderPixel")) {
            return "rightBorder"
        }
        else return "free"
    }
}

class obstruction {
    constructor(obX, obY) {
        this.x = obX
        this.y = obY
        this.px = prevX
        this.py = prevY
    }

    tick = 0
    lastObstr = []

    obstructionModel = [
        { x: 0, y: 0, fill: true }, { x: 0, y: 1, fill: false }, { x: 0, y: 2, fill: true },
        { x: 1, y: 0, fill: false }, { x: 1, y: 1, fill: true }, { x: 1, y: 2, fill: false },
        { x: 2, y: 0, fill: true }, { x: 2, y: 1, fill: true }, { x: 2, y: 2, fill: true },
        { x: 3, y: 0, fill: false }, { x: 3, y: 1, fill: true }, { x: 3, y: 2, fill: false }
    ]

    drawObstr() {
        let i = 0
        this.lastObstr = this.obstructionModel.map(({ x, y, f }) => {
            x += this.x
            y += this.y
            f = this.obstructionModel[i].fill
            this.px = this.x
            this.py = this.y
            i++
            //this.tick++
            if (f == true && document.getElementById(x + " " + y)) {
                document.getElementById(x + " " + y).classList.remove("pixel0")
                document.getElementById(x + " " + y).classList.add("obstr")
                document.getElementById(x + " " + y).classList.add("pixel1")
            }
            return { x, y, f }
        })
    }

    deleteObstr() {
        let i = 0
        this.obstructionModel.map(({ x, y, f }) => {
            x += this.px
            y += this.py
            f = this.obstructionModel[i].fill
            i++
            if (f == true && document.getElementById(x + " " + y)) {
                document.getElementById(x + " " + y).classList.add("pixel0")
                document.getElementById(x + " " + y).classList.remove("obstr")
                document.getElementById(x + " " + y).classList.remove("pixel1")
            }
        })
    }

    moveObstr(obstruction) {
        setTimeout(() => {
            this.moveObstr(obstruction)
            {
                obstruction.deleteObstr()
                obstruction.drawObstr()
                obstruction.x++
            }
        }, 500)
    }
}

function render(player) {
    setTimeout(() => {
        render(player)
        {
            let check = player.playerCheck()
            if (check == "free") {
                leftBorder = 0
                rightBorder = 0
            }
            else if (check == "leftBorder") {
                leftBorder = 1
                rightBorder = 0
            }
            else if (check == "rightBorder") {
                rightBorder = 1
                leftBorder = 0
            }
            console.log(player.playerPosX, player.playerPosY, player.prevX, player.prevY, player.playerCheck(), leftBorder, rightBorder)
        }
    }, timeout);
}

const main = () => {
    obs = new obstruction(-5, 1)
    pl = new player(playerPosX, playerPosY, prevX, prevY)

    fillGrid()
    pl.draw()
    document.addEventListener(('keydown'), function (event) {
        pl.playerMove(event)
    })
    
    render(pl)
    obs.moveObstr(obs)
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
})