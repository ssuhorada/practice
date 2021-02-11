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

function playerCheck(x, y) {
    let fieldCheck = document.querySelectorAll('.pixel0, .pixel1, .player')

    if (fieldCheck[x * 10 + y - 2].matches(".borderPixel")) {
        return "leftBorder"
    }
    else if (fieldCheck[x * 10 + y + 2].matches(".borderPixel")) {
        return "rightBorder"
    }
    else return "free"
}

function randomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function drawObstr(x, y) {
    let field = document.querySelectorAll('.pixel0, .pixel1, .player')
    obstr.push(field[x * 10 + y])

    if (x >= 0 && x < 16) {
        field[x * 10 + y].classList.remove('pixel0')
        field[x * 10 + y].classList.add('obstr')
        field[x * 10 + y].classList.add('pixel1')
    }

    if (x >= 1 && x < 17) {
        field[x * 10 + y - 10].classList.remove('pixel0')
        field[x * 10 + y - 10].classList.add('obstr')
        field[x * 10 + y - 10].classList.add('pixel1')
        field[x * 10 + y - 11].classList.remove('pixel0')
        field[x * 10 + y - 11].classList.add('obstr')
        field[x * 10 + y - 11].classList.add('pixel1')
        field[x * 10 + y - 9].classList.remove('pixel0')
        field[x * 10 + y - 9].classList.add('obstr')
        field[x * 10 + y - 9].classList.add('pixel1')
    }

    if (x >= 2 && x < 18) {
        field[x * 10 + y - 20].classList.remove('pixel0')
        field[x * 10 + y - 20].classList.add('obstr')
        field[x * 10 + y - 20].classList.add('pixel1')
    }

    if (x >= 3 && x < 19) {
        field[x * 10 + y - 31].classList.remove('pixel0')
        field[x * 10 + y - 31].classList.add('obstr')
        field[x * 10 + y - 31].classList.add('pixel1')
        field[x * 10 + y - 29].classList.remove('pixel0')
        field[x * 10 + y - 29].classList.add('obstr')
        field[x * 10 + y - 29].classList.add('pixel1')
    }
}

function deleteObstr(x, y) {
    let field = document.querySelectorAll('.pixel0, .pixel1, .player')
    obstr.push(field[x * 10 + y])

    if (x >= 0 && x < 16) {
        field[x * 10 + y].classList.add('pixel0')
        field[x * 10 + y].classList.remove('obstr')
        field[x * 10 + y].classList.remove('pixel1')
    }

    if (x >= 1 && x < 17) {
        field[x * 10 + y - 10].classList.add('pixel0')
        field[x * 10 + y - 10].classList.remove('obstr')
        field[x * 10 + y - 10].classList.remove('pixel1')
        field[x * 10 + y - 11].classList.add('pixel0')
        field[x * 10 + y - 11].classList.remove('obstr')
        field[x * 10 + y - 11].classList.remove('pixel1')
        field[x * 10 + y - 9].classList.add('pixel0')
        field[x * 10 + y - 9].classList.remove('obstr')
        field[x * 10 + y - 9].classList.remove('pixel1')
    }

    if (x >= 2 && x < 18) {
        field[x * 10 + y - 20].classList.add('pixel0')
        field[x * 10 + y - 20].classList.remove('obstr')
        field[x * 10 + y - 20].classList.remove('pixel1')
    }

    if (x >= 3 && x < 19) {
        field[x * 10 + y - 31].classList.add('pixel0')
        field[x * 10 + y - 31].classList.remove('obstr')
        field[x * 10 + y - 31].classList.remove('pixel1')
        field[x * 10 + y - 29].classList.add('pixel0')
        field[x * 10 + y - 29].classList.remove('obstr')
        field[x * 10 + y - 29].classList.remove('pixel1')
    }
}

let obstr = []
let playerPosX = 14
let playerPosY = 6
let prevX = playerPosX
let prevY = playerPosY
let leftBorder = 0, rightBorder = 0
let timeout = 1000, i = 0

class player {
    constructor(x, y, px, py) {
        this.playerPosX = x
        this.playerPosY = y
        this.prevX = px
        this.prevY = py
    }

    allPixels = []
    mas = 0

    draw() {
        this.mas = this.playerPosX * 10 + this.playerPosY
        let field = document.querySelectorAll('.pixel0, .pixel1, .player')

        this.allPixels[0] = this.mas
        this.allPixels[1] = this.mas - 10
        this.allPixels[2] = this.mas - 11
        this.allPixels[3] = this.mas - 9
        this.allPixels[4] = this.mas - 20
        this.allPixels[5] = this.mas + 9
        this.allPixels[6] = this.mas + 11

        for (let i = 0; i < 7; i++) {
            field[this.allPixels[i]].classList.remove("pixel0")
            field[this.allPixels[i]].classList.add("player")
            field[this.allPixels[i]].classList.add("pixel1")
        }
    }

    delete() {
        this.mas = this.prevX * 10 + this.prevY
        let field = document.querySelectorAll('.pixel0, .pixel1, .player')

        this.allPixels[0] = this.mas
        this.allPixels[1] = this.mas - 10
        this.allPixels[2] = this.mas - 11
        this.allPixels[3] = this.mas - 9
        this.allPixels[4] = this.mas - 20
        this.allPixels[5] = this.mas + 9
        this.allPixels[6] = this.mas + 11

        for (let i = 0; i < 7; i++) {
            field[this.allPixels[i]].classList.add("pixel0")
            field[this.allPixels[i]].classList.remove("player")
            field[this.allPixels[i]].classList.remove("pixel1")
        }
    }

    playerMove(event) {
        if (event.key == 'ArrowRight') {
            if (this.playerPosY < 7) {
                this.playerPosY++
                this.delete()
                this.draw()
                //playerMove(playerPosX, playerPosY, prevX, prevY)
                this.prevX = this.playerPosX
                this.prevY = this.playerPosY
            }
        }
        if (event.key == 'ArrowLeft') {
            if (this.playerPosY > 2) {
                this.playerPosY--
                this.delete()
                this.draw()
                //playerMove(playerPosX, playerPosY, prevX, prevY)
                this.prevX = this.playerPosX
                this.prevY = this.playerPosY
            }
        }
    }
}


function render(player) {
    setTimeout(() => {
        render(player)
        {
            if (playerCheck(playerPosX, playerPosY) == "free") {
                leftBorder = 0
                rightBorder = 0
            }
            else if (playerCheck(playerPosX, playerPosY) == "leftBorder") {
                leftBorder = 1
                rightBorder = 0
            }
            else if (playerCheck(playerPosX, playerPosY) == "rightBorder") {
                rightBorder = 1
                leftBorder = 0
            }
            console.log(player.playerPosX, player.playerPosY, player.prevX, player.prevY)
        }
    }, timeout);
}

const main = () => {
    fillGrid()
    pl = new player(playerPosX, playerPosY, prevX, prevY)
    pl.draw()
    render(pl)
    document.addEventListener(('keydown'), function (event) {
        pl.playerMove(event)
    })
};

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
})