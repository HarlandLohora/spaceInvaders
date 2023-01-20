const lienzo = document.getElementById("space")
console.log(lienzo)

const ctx = lienzo.getContext("2d")
console.log(ctx)

//Balas
const balas = []

//Aliens
const aliens = []

//Personaje - Clase

class Nave {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocidad = 10
        this.kills = 0
    }

    //Metodos

    dibujarse() {
        //ctx.drawImage()
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    disparar() {
        const bala = new Bala(this.x + this.w, this.y + (this.h / 2))
        balas.push(bala)
    }

    adelante() {
        if (this.x < 570) {
            this.x += this.velocidad
        }
    }

    atras() {
        if (this.x > 0) {
            this.x -= this.velocidad
        }
    }

    arriba() {
        if (this.y > 0) {
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
        ctx.fillRect(this.x, this.y, 10, 5)
        console.log({ x: this.x })
        //Mueve adelante

        if (this.x > 600) {
            balas.shift()
        }
    }
}

//Alien - Clase
class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dibujarse() {
        this.x -= 1
        ctx.fillRect(this.x, this.y, 30, 50)
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
            nave.disparar()
            break
    }
})

let tiempo = 0

//Funcion empezar juego
function empezarJuego() {
    console.log("Estamos jugando")
    ctx.clearRect(0, 0, 600, 300)
    //Dibujar nave
    nave.dibujarse()

    //Dibujar balas
    balas.forEach((bala, indexBala) => {
        bala.x += 2
        console.log("dibuja")
        bala.dibujarse()

        aliens.forEach((alien, indexAlien) => {
            console.log({ balaX: bala.x, balaY: bala.y, alienX: alien.x, alienY: alien.y })

            if (alien.x <= bala.x + 10 && bala.y >= alien.y && bala.y <= alien.y + 50) {
                aliens.splice(indexAlien, 1)
                balas.splice(indexBala, 1)
                nave.kills++
            }
        })
    })

    //Dibujar aliens
    aliens.forEach((alien) => {
        alien.dibujarse()
    })

    tiempo++
    ctx.font = "25px Arial"
    ctx.fillText(tiempo, 10, 30)

    //Pintar los muertos
    ctx.fillText(`${nave.kills} Muertos`, 290, 30)

    requestAnimationFrame(empezarJuego) //FPS 
}

//Seleccionamos el btn y empezamos el juego
let btn = document.getElementById("jugar")

btn.addEventListener("click", () => {
    empezarJuego()
    crearAliens()
    btn.classList.add("none")
})

//Creacion de los aliens
function crearAliens() {
    setInterval(() => {
        const posicionY = Math.floor(Math.random() * 250)
        console.log(posicionY)
        const a = new Alien(600, posicionY)
        aliens.push(a)
    }, 3000)
}