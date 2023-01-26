const lienzo = document.getElementById("space")
console.log(lienzo)

const ctx = lienzo.getContext("2d")
console.log(ctx)

let requestReference

let idCrearAliens

let idCrearMoneda

//Nivel

const nivel = document.getElementById("nivel")

let frecEnemigos = 3000
let cantidadBalas = 4

nivel.addEventListener("click", () => {
    switch (nivel.innerText) {
        case "Facil":
            nivel.innerText = "Medio"
            frecEnemigos = 2500
            cantidadBalas = 3
            break;
        case "Medio":
            nivel.innerText = "Dificil"
            frecEnemigos = 2000
            cantidadBalas = 2
            break
        default:
            nivel.innerText = "Facil"
            frecEnemigos = 3000
            cantidadBalas = 4
            break
    }
})


//Pausa

let pausaBtn = document.getElementById("pausaToggle")

pausaBtn.addEventListener("click", () => {
    if (pausaBtn.innerText === "Pausa") {
        pausaBtn.innerText = "Play"
        cancelAnimationFrame(requestReference)
        clearInterval(idCrearAliens)
        clearInterval(idCrearMoneda)
    } else {
        pausaBtn.innerText = "Pausa"
        empezarJuego()
        crearAliens()
        crearMoneda()
    }
})

pausaBtn.addEventListener("focus", function () {
    this.blur()
})

//Seleccion menu
const menu = document.querySelector(".botones")

//Seleccion gameOver
const gameOver = document.querySelector(".gameOver")

//Cargamos las imagenes

const heart = new Image()
heart.src = "./assets/img/heart.png"
console.log(heart)

const alien = new Image()
alien.src = "./assets/img/alien.png"

const alien1 = new Image()
alien1.src = "./assets/img/alien2.png"

const alien2 = new Image()
alien2.src = "./assets/img/alien3.png"

const bullet = new Image()
bullet.src = "./assets/img/bullet.png"

const naveD = new Image()
naveD.src = "./assets/img/nave-d.png"

const naveI = new Image()
naveI.src = "./assets/img/nave-i.png"


const coin0 = new Image()
coin0.src = "./assets/img/0.gif"
const coin1 = new Image()
coin1.src = "./assets/img/1.gif"
const coin2 = new Image()
coin2.src = "./assets/img/2.gif"
const coin3 = new Image()
coin3.src = "./assets/img/3.gif"
const coin4 = new Image()
coin4.src = "./assets/img/4.gif"
const coin5 = new Image()
coin5.src = "./assets/img/5.gif"
const coin6 = new Image()
coin6.src = "./assets/img/6.gif"
const coin7 = new Image()
coin7.src = "./assets/img/7.gif"
const coin8 = new Image()
coin8.src = "./assets/img/8.gif"
const coin9 = new Image()
coin9.src = "./assets/img/9.gif"

const coins = [coin0, coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8, coin9]
//Sonidos

const shoot = new Audio("./assets/sounds/shoot.mp3")

const die = new Audio("./assets/sounds/die.mp3")


//Arreglo aliens

const tiposAliens = [alien, alien1, alien2]

//Balas
const balas = []

//Aliens
const aliens = []

//Monedas
const monedas = []

//Personaje - Clase

class Nave {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocidad = 10
        this.kills = 0
        this.lifes = 3
        this.img = naveD
        this.coins = 0
    }

    //Metodos

    dibujarse() {
        //ctx.drawImage()
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    disparar() {
        const bala = new Bala(this.x + this.w, this.y + (this.h / 2))
        balas.push(bala)

        //Sonido
        shoot.play()
    }

    adelante() {
        if (this.x < 570) {
            this.x += this.velocidad
        }
        this.img = naveD
    }

    atras() {
        if (this.x > 0) {
            this.x -= this.velocidad
        }
        this.img = naveI
    }

    arriba() {
        if (this.y > 40) {
            this.y -= this.velocidad
        }
    }

    abajo() {
        if (this.y < 270) {
            this.y += this.velocidad
        }
    }
}

//Bala - Clase
class Bala {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dibujarse() {
        ctx.drawImage(bullet, this.x, this.y, 40, 10)
        console.log({ x: this.x })
        //Mueve adelante

        if (this.x > 600) {
            balas.shift()
        }
    }
}

//Alien - Clase
class Alien {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img
    }
    dibujarse() {
        this.x -= 1
        ctx.drawImage(this.img, this.x, this.y, 30, 50)
    }
}

//Coin

class Coin {
    constructor(x) {
        this.x = x
        this.y = 0
        this.img = 0
    }

    dibujarse() {
        //Aumentamos uno para que baje
        if (tiempo % 5 === 0) {
            this.y++
        }
        ctx.drawImage(coins[this.img], this.x, this.y, 30, 30)
        if (this.img < coins.length - 1) {
            this.img++
        } else {
            this.img = 0
        }
    }
}

ctx.fillStyle = "white"


//Instancia
const nave = new Nave(10, 140, 30, 30)

console.log(nave)


//Escuchamos las teclas 

document.addEventListener("keydown", (evento) => {
    // console.log(evento.key)
    switch (evento.key) {
        case "ArrowRight":
            nave.adelante()
            break;
        case "ArrowLeft":
            nave.atras()
            break;
        case "ArrowUp":
            nave.arriba()
            break;
        case "ArrowDown":
            nave.abajo()
            break;
        case " ":
            if (balas.length < cantidadBalas) {
                nave.disparar()
            }
            break
    }
})

let tiempo = 0

//Funcion empezar juego
function empezarJuego() {
    ctx.clearRect(0, 0, 600, 300)
    //Dibujar nave
    nave.dibujarse()

    //Verificar si sigue vivo
    if (nave.lifes === 0) {
        setGameOver()
    }

    //Verificar si gano

    if (nave.coins > 2) {
        //setWin()
        alert()
    }

    //Dibujar balas
    balas.forEach((bala, indexBala) => {
        bala.x += 2
        console.log("dibuja")
        bala.dibujarse()

        aliens.forEach((alien, indexAlien) => {
            console.log({ balaX: bala.x, balaY: bala.y, alienX: alien.x, alienY: alien.y })

            if (
                alien.x <= bala.x + 10 &&
                bala.y >= alien.y &&
                bala.y <= alien.y + 50 &&
                bala.x <= alien.x
            ) {
                aliens.splice(indexAlien, 1)
                balas.splice(indexBala, 1)
                nave.kills++
            }
        })
    })

    //Dibujar aliens
    aliens.forEach((alien, indexAlien) => {
        alien.dibujarse()
        //Si toca x:0 perdemos
        if (alien.x <= 0) {
            setGameOver()
        }

        //Colision de la nave vs alien
        if (
            alien.x <= nave.x + 30 &&
            nave.y + 30 >= alien.y &&
            nave.x <= alien.x &&
            nave.y <= alien.y + 50
        ) {
            nave.lifes--
            aliens.splice(indexAlien, 1)
        }
    })

    //Mostrar monedas
    monedas.forEach((moneda, indexMoneda) => {


        moneda.dibujarse()

        if (moneda.y >= 300) {
            monedas.splice(indexMoneda, 1)
        }

        //Colision vs nave
        if (
            moneda.x <= nave.x + 30 &&
            nave.y + 30 >= moneda.y &&
            nave.x <= moneda.x &&
            nave.y <= moneda.y + 30
        ) {
            nave.coins++
            monedas.splice(indexMoneda, 1)
        }
    })

    tiempo++
    ctx.font = "25px Arial"
    ctx.fillText(tiempo, 10, 30)

    //Pintar los muertos
    ctx.fillText(`${nave.kills} Muertos`, 290, 30)

    //Pintar las vidas
    mostrarVidas()

    //Pintar las coins
    ctx.fillText(`${nave.coins}`, 100, 30)

    let reqId = requestAnimationFrame(empezarJuego) //FPS 
    console.log(reqId)
    requestReference = reqId
}

//Seleccionamos el btn y empezamos el juego
let btn = document.getElementById("jugar")

btn.addEventListener("click", () => {
    empezarJuego()
    crearAliens()
    crearMoneda()
    btn.classList.add("none")

    nivel.setAttribute("disabled", "")
})

//Creacion de los aliens
function crearAliens() {
    idCrearAliens = setInterval(() => {
        const posicionY = Math.floor((Math.random() * 210) + 40)
        console.log(posicionY)

        const posicionAleatoria = Math.floor(Math.random() * tiposAliens.length)
        const alienAleatorio = tiposAliens[posicionAleatoria]

        const a = new Alien(600, posicionY, alienAleatorio)
        aliens.push(a)
    }, frecEnemigos)
}


//Creacion monedas
function crearMoneda() {
    idCrearMoneda = setInterval(() => {
        const posicionAleatoria = Math.floor(Math.random() * 570)
        const moneda = new Coin(posicionAleatoria)
        monedas.push(moneda)
    }, 5000)
}

//Mostrar vidas 

function mostrarVidas() {
    if (nave.lifes === 3) {
        ctx.drawImage(heart, 460, 10, 30, 30)
        ctx.drawImage(heart, 500, 10, 30, 30)
        ctx.drawImage(heart, 540, 10, 30, 30)
    }

    if (nave.lifes === 2) {
        ctx.drawImage(heart, 460, 10, 30, 30)
        ctx.drawImage(heart, 500, 10, 30, 30)
    }

    if (nave.lifes === 1) {
        ctx.drawImage(heart, 460, 10, 30, 30)
    }
}

//Game Over 

function setGameOver() {
    //Agregar la clase none al menu y canvas
    lienzo.classList.add("none") //lienzo.setAttribute("class", "none")
    menu.classList.add("none")
    gameOver.classList.remove("none") //gameOver.removeAttribute("class")

    //die.play()

}