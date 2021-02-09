function fillGrid()
{
    let cont = document.querySelector(".container")
    for (let i = 0; i<16; i++)
    {
        for (let j = 0; j<10; j++)
        {
            let el = document.createElement("div")
            el.id=i+" "+j
            if (j==0)
            {
                el.classList.add("borderPixel")
                el.classList.add("pixel1")   
                if(cont) cont.append(el)         
            } else 
            if (j>0 && j<9)
            {
                el.classList.add("pixel0")    
                if(cont) cont.append(el)     
            }
            if (j==9)
            {
                el.classList.add("borderPixel")
                el.classList.add("pixel1")
                if(cont) cont.append(el)
            } else
            if (j>0 && j<9)
            {
                el.classList.add("pixel0")  
                if(cont) cont.append(el)
            }
        }
    }
}

function drawPlayer(x, y)
{
    let field = document.querySelectorAll('.pixel0, .pixel1, .player')
    console.log(field)
    field[x*10+y].classList.remove("pixel0")
    field[x*10+y].classList.add("player")
    field[x*10+y].classList.add("pixel1")

    field[x*10+y-10].classList.remove("pixel0")
    field[x*10+y-10].classList.add("player")
    field[x*10+y-10].classList.add("pixel1")

    field[x*10+y-11].classList.remove("pixel0")
    field[x*10+y-11].classList.add("player")
    field[x*10+y-11].classList.add("pixel1")

    field[x*10+y-9].classList.remove("pixel0")
    field[x*10+y-9].classList.add("player")
    field[x*10+y-9].classList.add("pixel1")

    field[x*10+y-20].classList.remove("pixel0")
    field[x*10+y-20].classList.add("player")
    field[x*10+y-20].classList.add("pixel1")

    field[x*10+y+9].classList.remove("pixel0")
    field[x*10+y+9].classList.add("player")
    field[x*10+y+9].classList.add("pixel1")

    field[x*10+y+11].classList.remove("pixel0")
    field[x*10+y+11].classList.add("player")
    field[x*10+y+11].classList.add("pixel1")
}

function deletePlayer(x, y)
{
    let field = document.querySelectorAll('.pixel0, .pixel1, .player')
    console.log(field)
    field[x*10+y].classList.add("pixel0")
    field[x*10+y].classList.remove("player")
    field[x*10+y].classList.remove("pixel1")

    field[x*10+y-10].classList.add("pixel0")
    field[x*10+y-10].classList.remove("player")
    field[x*10+y-10].classList.remove("pixel1")

    field[x*10+y-11].classList.add("pixel0")
    field[x*10+y-11].classList.remove("player")
    field[x*10+y-11].classList.remove("pixel1")

    field[x*10+y-9].classList.add("pixel0")
    field[x*10+y-9].classList.remove("player")
    field[x*10+y-9].classList.remove("pixel1")

    field[x*10+y-20].classList.add("pixel0")
    field[x*10+y-20].classList.remove("player")
    field[x*10+y-20].classList.remove("pixel1")

    field[x*10+y+9].classList.add("pixel0")
    field[x*10+y+9].classList.remove("player")
    field[x*10+y+9].classList.remove("pixel1")

    field[x*10+y+11].classList.add("pixel0")
    field[x*10+y+11].classList.remove("player")
    field[x*10+y+11].classList.remove("pixel1")
}

const main = () => {
    fillGrid()
    drawPlayer(14,3)
};

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
})