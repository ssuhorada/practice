let timeout = 80

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
    constructor(x, y) {
        this.playerPosX = x
        this.playerPosY = y
        this.prevX = this.playerPosX
        this.prevY = this.playerPosY
    }

    playerModel = [
        { x: 0, y: 1 },
        { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 3, y: 0 }, { x: 3, y: 2 }
    ]

    lastPlayer = []

    draw() {
        let i = 0
        this.lastPlayer = this.playerModel.map(({ x, y }) => {
            x += this.playerPosX
            y += this.playerPosY
            this.prevX = this.playerPosX
            this.prevY = this.playerPosY
            i++
            document.getElementById(x + " " + y).classList.remove("pixel0")
            document.getElementById(x + " " + y).classList.add("player")
            document.getElementById(x + " " + y).classList.add("pixel1")
            return { x, y }
        })
    }

    delete() {

        let i = 0
        this.playerModel.map(({ x, y }) => {
            x += this.prevX
            y += this.prevY
            i++
            document.getElementById(x + " " + y).classList.add("pixel0")
            document.getElementById(x + " " + y).classList.remove("player")
            document.getElementById(x + " " + y).classList.remove("pixel1")
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
        this.px = this.x
        this.py = this.y
    }

    lastObstr = []
    multiplier = 1

    obstructionModel = [
        { x: 0, y: 0 }, { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
        { x: 3, y: 1 }
    ]

    drawObstr() {
        let i = 0
        this.lastObstr = this.obstructionModel.map(({ x, y }) => {
            x += this.x
            y += this.y
            this.px = this.x
            this.py = this.y
            i++
            //this.tick++
            if (document.getElementById(x + " " + y)) {
                document.getElementById(x + " " + y).classList.remove("pixel0")
                document.getElementById(x + " " + y).classList.add("obstr")
                document.getElementById(x + " " + y).classList.add("pixel1")
            }
            return { x, y }
        })
    }

    deleteObstr() {
        let i = 0
        this.obstructionModel.map(({ x, y }) => {
            x += this.px
            y += this.py
            i++
            if (document.getElementById(x + " " + y)) {
                document.getElementById(x + " " + y).classList.add("pixel0")
                document.getElementById(x + " " + y).classList.remove("obstr")
                document.getElementById(x + " " + y).classList.remove("pixel1")
            }
        })
    }

    moveObstr(obstruction) {
        obstruction.deleteObstr()
        obstruction.drawObstr()
        obstruction.x++
    }
}

//--------------------------переменные убрать бы..............
let obstrArray = []
let kostil = 0
let test = true
let letSpawn = true
let al
let dificult = 0
let divider = 15
let score = 0
let stopScore = false

function ticker(player, obstruct) {
    if (test)
        setTimeout(() => {
            ticker(player, obstruct)
            {
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 7; j++) {
                        obstruct.forEach(el => {
                            if (player.lastPlayer[i].x == el.lastObstr[j].x &&
                                player.lastPlayer[i].y == el.lastObstr[j].y && test) {
                                test = false
                                alert("Бабах")
                                window.location.href = window.location.href;
                            }
                            if (el.x == 19) {
                                despawn(el)
                                dificult++
                            }
                            if (el.x == 7 && letSpawn) {
                                spawn()
                                letSpawn = false
                            }
                            if (el.x == 17 && !stopScore) {
                                score += 100
                                let el = document.getElementById("scores")
                                if (!el.textContent) el.append("Ваши очки: " + score)
                                else el.textContent = "Ваши очки: " + score
                                if (localStorage.getItem('scores')) {
                                    if (localStorage.getItem('scores') < score) {
                                        localStorage.setItem('scores', score)
                                    }
                                } else localStorage.setItem('scores', score)
                                stopScore = true
                            }
                        })
                    }

                }
                kostil++
                if (kostil == divider) {
                    obstruct.forEach(el => el.moveObstr(el))
                    kostil = 0
                    letSpawn = true
                    stopScore = false
                }
                if (dificult == 1) {
                    if (divider > 2) divider--
                    dificult = 0
                }
            }
        }, 43);
}

function spawn() {
    let rand = randomInterval(1, 6)
    rand = Math.round(rand)
    obstrArray.unshift(new obstruction(-4, rand))
    obstrArray[0].drawObstr()
}

function despawn(obstruct) {
    obstruct.deleteObstr()
    obstrArray.pop()
}

const main = () => {
    let el = document.getElementById('start')
    let res = document.getElementById('results')
    let clear = document.getElementById('clear')
    let pl = new player(12, 5)
    let startFlag = true
    clear.onclick = () => {
        localStorage.clear()
    }

    if (localStorage.getItem('customer')) res.prepend(localStorage.getItem('customer'))
    fillGrid()
    pl.draw()
    if (!localStorage.getItem('customer')) {
        al = prompt("Для сохранения результата введите никнейм:", "Писать сюда")
        if (al != "Писать сюда") {
            res.prepend(al)
            localStorage.setItem('customer', al)
        }
        else {
            res.prepend("Гость")
            localStorage.setItem('customer', "Гость")
        }
        if (res.textContent == "null") {
            res.textContent = "Гость"
            localStorage.setItem('customer', "Гость")
        }
    }
    el.onclick = () => {
        if (startFlag) {
            document.addEventListener(('keydown'), function (event) {
                pl.playerMove(event)
            })
            startFlag = false
            spawn()
            ticker(pl, obstrArray)
        }
    }

    if (localStorage.getItem('scores')) document.getElementById("scores").prepend("Лучший Ваш результат сегодня: " + localStorage.getItem('scores'))
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        main();
    }
})
