// Знаходимо елементи
const field = document.querySelector("#field");
const target = document.querySelector("#target");
const overlay = document.querySelector("#overlay");
const overlayText = document.querySelector("#overlayText");
const startBtn = document.querySelector("#startBtn");
 
const scoreText = document.querySelector("#score");
const missesText = document.querySelector("#misses");
const timeText = document.querySelector("#time");
const reactionText = document.querySelector("#reaction");
const bestText = document.querySelector("#best");


// Змінні гри
let score = 0
let GAME_TIME = 20
let JUMP_SPEED = 1000
let misses = 0


// Стан гри
let timeLeft = GAME_TIME
let gameTimer = null
let jumpTimer = null

let appearTime = 0
let fastest = 0
let best = +localStorage.getItem('reactionBest') || 0
bestText.innerHTML = best

// Функції


function startGame() {
    score = 0
    misses = 0
    timeLeft = GAME_TIME
    fastest = 0
    scoreText.innerHTML = score
    missesText.innerHTML = misses
    timeText.innerHTML = timeLeft
    reactionText.innerHTML = '-'
    overlay.classList.add('hidden')
    target.classList.remove('hidden')
    moveTarget()


    gameTimer = setInterval(tick, 1000)
    jumpTimer = setInterval(autoJump, JUMP_SPEED)
}
function hitTarget() {
    const reaction = Date.now() - appearTime
    reactionText.innerHTML = `${reaction} мс`
    if (fastest == 0 || reaction < fastest) {
        fastest = reaction
    }
    score++
    scoreText.innerHTML = score
    clearInterval(jumpTimer)
    moveTarget()
    jumpTimer = setInterval(autoJump, JUMP_SPEED)
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function moveTarget() {
    let size = target.offsetWidth
    let maxX = field.clientWidth - size
    let maxY = field.clientHeight - size
    target.style.top = randomNumber(0, maxY) + 'px'
    target.style.left = randomNumber(0, maxX) + 'px'
    
    appearTime = Date.now()
}


function tick() {
    timeLeft--
    timeText.innerHTML = timeLeft
    if (timeLeft == 0) {
        endGame()
    }
}


function endGame() {
    clearInterval(gameTimer)
    clearInterval(jumpTimer)
    target.classList.add('hidden')


    overlayText.innerHTML = `Час вийшов! Влучань: ${score}`
    if (fastest > 0){
        overlay.innerHTML += `Найшвидша реакція: ${fastest} мс`
    }
    if (score > best) {
        best = score
        localStorage.setItem(`reaction`, best)
        bestText.innerHTML = best
        overlayText.innerHTML += 'Новий рекорд!'
    }
    startBtn.innerHTML = 'Ще раз'
    overlay.classList.remove('hidden')
}


function autoJump() {
    misses++
    missesText.innerHTML = misses
    moveTarget()
}


// Події
startBtn.addEventListener('click', startGame)
target.addEventListener('click', hitTarget)

