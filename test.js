function fillGrid() {
    let cont = document.querySelector(".container")
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 10; j++) {
            let el = document.createElement("div")
            el.id = i + " " + j
            if (j == 0 || j == 9) {
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

class Player {
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
}

class Obstruction {
    constructor(obX, obY) {
        this.x = obX
        this.y = obY
        this.px = this.x
        this.py = this.y
    }

    lastObstr = []

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

class Score {
    tempScore = 0
    bestScore = 0
    
    deleteCustomer (){
        localStorage.clear()
    }

    get_bestScore() {
        this.bestScore = localStorage.getItem("bestScore")
        return this.bestScore
    }

    compareBestScore(scoreAtNow) {
        if (scoreAtNow > this.bestScore) {
            localStorage.setItem("bestScore", JSON.stringify(scoreAtNow))
            this.bestScore = scoreAtNow
        }
    }

    
}

class Game {
    onlyOneCollision = true
    letSpawn = true
    letScore = true
    tickForDivide = 0
    changeDif = 0
    divider = 15
    despawnLevel = 19
    spawnLevel = 7
    noVisionLevel = 17
    timeout = 40

    setAllSessionStorage() {
        sessionStorage.setItem("onlyOneCollision", JSON.stringify(this.onlyOneCollision))
        sessionStorage.setItem("tickForDivide", JSON.stringify(this.tickForDivide))
        sessionStorage.setItem("changeDif", JSON.stringify(this.changeDif))
        sessionStorage.setItem("letSpawn", JSON.stringify(this.letSpawn))
        sessionStorage.setItem("letScore", JSON.stringify(this.letScore))
        sessionStorage.setItem("divider", JSON.stringify(this.divider))
    }

    set_onlyOneCollision(state) {
        this.onlyOneCollision = state
        this.setAllSessionStorage()
    }

    set_tickForDivide(state) {
        this.tickForDivide = state
        this.setAllSessionStorage()
    }

    set_changeDif(state) {
        this.changeDif = state
        this.setAllSessionStorage()
    }

    set_letSpawn(state) {
        this.letSpawn = state
        this.setAllSessionStorage()
    }

    set_letScore(state) {
        this.letScore = state
        this.setAllSessionStorage()
    }

    set_divider(state) {
        this.divider = state
        this.setAllSessionStorage()
    }
}

function spawn() {
    let rand = randomInterval(1, 6)
    rand = Math.round(rand)
    obstrArray.unshift(new Obstruction(-4, rand))
    obstrArray[0].drawObstr()
}

function despawn(obstruct) {
    obstruct.deleteObstr()
    obstrArray.pop()
}

//--------------------------переменные убрать бы..............
let obstrArray = []
let score = 0

function ticker(player, obstruct, game) {
    if (game.onlyOneCollision)
        setTimeout(() => {
            ticker(player, obstruct, game)
            obstruct.forEach(el => {
                if (player.lastPlayer.some((plItem) => el.lastObstr.find((obsItem) =>
                    plItem.x === obsItem.x && plItem.y === obsItem.y)) && game.onlyOneCollision) {
                    game.set_onlyOneCollision(false)
                    alert("Бабах")
                    location.reload()
                }
                if (el.x === game.despawnLevel) {
                    despawn(el)
                    game.set_changeDif(1)
                }
                if (el.x === game.spawnLevel && game.letSpawn) {
                    spawn()
                    game.set_letSpawn(false)
                }
                if (el.x == game.noVisionLevel && game.letScore) {
                    score += 100
                    let el = document.getElementById("scores")
                    if (!el.textContent) el.append("Ваши очки: " + score)
                    else el.textContent = "Ваши очки: " + score
                    if (localStorage.getItem('scores'))
                        if (localStorage.getItem('scores') < score) {
                            localStorage.setItem('scores', score)
                        }
                        else localStorage.setItem('scores', score)
                    game.set_letScore(false)
                }
            })
            game.set_tickForDivide(game.tickForDivide + 1)
            if (game.tickForDivide === game.divider) {
                obstruct.forEach(el => el.moveObstr(el))
                game.set_tickForDivide(0)
                game.set_letScore(true)
                game.set_letSpawn(true)
            }
            if (game.changeDif === 1) {
                if (game.divider > 2) game.set_divider(game.divider - 1)
                game.set_changeDif(0)
            }
        }, game.timeout);
}

const main = () => {
    const startButton = document.getElementById('start')
    const resultsGrid = document.getElementById('results')
    const clearButton = document.getElementById('clear')

    const g = new Game
    sessionStorage.clear()
    g.setAllSessionStorage()

    const tempPlayer = new Player(12, 5)
    let startFlag = true
    let tempAlert

    clearButton.addEventListener('click', () => {
        localStorage.clear()
    })

    fillGrid()
    tempPlayer.draw()
    if (localStorage.getItem('customer')) resultsGrid.prepend(localStorage.getItem('customer'))
    if (!localStorage.getItem('customer')) {
        tempAlert = prompt("Для сохранения результата введите никнейм:", "Писать сюда")
        if (tempAlert != "Писать сюда") {
            resultsGrid.prepend(tempAlert)
            localStorage.setItem('customer', tempAlert)
        }
        else {
            resultsGrid.prepend("Гость")
            localStorage.setItem('customer', "Гость")
        }
        if (resultsGrid.textContent == "null") {
            resultsGrid.textContent = "Гость"
            localStorage.setItem('customer', "Гость")
        }
    }

    startButton.addEventListener('click', () => {
        if (startFlag) {
            document.addEventListener('keydown', function (event) {
                tempPlayer.playerMove(event)
            })
            startFlag = false
            spawn()
            ticker(tempPlayer, obstrArray, g)
        }
    })

    if (localStorage.getItem('scores')) document.getElementById("scores").prepend("Лучший Ваш результат сегодня: " + localStorage.getItem('scores'))
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
})