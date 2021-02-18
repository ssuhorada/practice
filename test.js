let obstrArray = []

function fillGrid(rows, columns) {
    let cont = document.querySelector(".container")
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let el = document.createElement("div")
            el.id = i + " " + j
            if (j == 0 || j == 9) {
                el.classList.add("borderPixel")
                if (cont) cont.append(el)
            } else {
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
            document.getElementById(x + " " + y).classList.add("player")
            return { x, y }
        })
    }

    delete() {
        let i = 0
        this.playerModel.map(({ x, y }) => {
            x += this.prevX
            y += this.prevY
            document.getElementById(x + " " + y).classList.remove("player")
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
            if (document.getElementById(x + " " + y)) {
                document.getElementById(x + " " + y).classList.add("obstr")
            }
            return { x, y }
        })
    }

    deleteObstr() {
        let i = 0
        this.obstructionModel.map(({ x, y }) => {
            x += this.px
            y += this.py
            if (document.getElementById(x + " " + y)) {
                document.getElementById(x + " " + y).classList.remove("obstr")
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

    deleteCustomer() {
        localStorage.clear()
    }

    saveCustomer(cust) {
        localStorage.setItem("customer", JSON.stringify(cust))
        localStorage.setItem("score", "0")
    }

    customerIsNull() {
        if (localStorage.getItem(`customer`)) return false
        else return true
    }

    not0() {
        if (JSON.parse(localStorage.getItem(`score`)) > 0) return true
        else return false
    }

    compareBestScore(scoreAtNow) {
        if (scoreAtNow > JSON.parse(localStorage.getItem(`score`))) {
            localStorage.setItem(`score`, JSON.stringify(scoreAtNow))
        }
    }

    scoreUp(x) {
        this.tempScore += x
    }

    get_customer() {
        return JSON.parse(localStorage.getItem(`customer`))
    }

    get_bestScore() {
        return JSON.parse(localStorage.getItem(`score`))
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
    rows = 16
    columns = 10

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

function ticker(player, obstruct, game, score) {
    if (game.onlyOneCollision)
        setTimeout(() => {
            ticker(player, obstruct, game, score)
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
                    score.scoreUp(100)
                    let el = document.getElementById(`scores`)
                    if (!el.textContent) el.append(`Ваши очки: ${score.tempScore}`)
                    else el.textContent = `Ваши очки: ${score.tempScore}`
                    score.compareBestScore(score.tempScore)
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

    const score = new Score
    const g = new Game
    const tempPlayer = new Player(12, 5)

    let startFlag = true
    let tempAlert

    sessionStorage.clear()

    g.setAllSessionStorage()
    clearButton.addEventListener('click', () => localStorage.clear())
    fillGrid(g.columns, g.rows)
    tempPlayer.draw()

    if (score.not0()) {
        resultsGrid.prepend(`Ваш лучший результат: ${score.get_bestScore()}`)
        resultsGrid.prepend(document.createElement(`br`))
    }

    if (score.customerIsNull()) {
        tempAlert = prompt(`Для сохранения результата введите никнейм:`, `Писать сюда`)
        if (tempAlert != `Писать сюда` && tempAlert != null)
            score.saveCustomer(tempAlert)
        else {
            score.saveCustomer(`Гость`)
            resultsGrid.prepend(score.get_customer())
        }
    }
    else resultsGrid.prepend(score.get_customer())

    startButton.addEventListener('click', () => {
        if (startFlag) {
            document.addEventListener('keydown', function (event) { tempPlayer.playerMove(event) })
            startFlag = false
            spawn()
            ticker(tempPlayer, obstrArray, g, score)
        }
    })

    if (localStorage.getItem('scores')) document.getElementById("scores").prepend("Лучший Ваш результат сегодня: " + localStorage.getItem('scores'))
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
})