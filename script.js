let score = 0;
let cross = true;
console.log("Game JS loaded");

let audio = new Audio('gamemusic.mp3');
let audiogo = new Audio('gameover.mp3');

let scorecont = document.getElementById('scorecont');

// Play audio only after user taps/clicks the screen
function startGameAudio() {
    audio.play();
    document.removeEventListener('touchstart', startGameAudio);
    document.removeEventListener('click', startGameAudio);
}
document.addEventListener('touchstart', startGameAudio);
document.addEventListener('click', startGameAudio);


// KEYBOARD CONTROL
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    let dino = document.querySelector('.dino');

    if (e.keyCode == 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode == 39) {
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }

    if (e.keyCode == 37) {
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";
    }
};

// ==========================
// 🟢 TOUCH CONTROLS FOR MOBILE
// ==========================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    let dino = document.querySelector('.dino');
    let diffX = touchEndX - touchStartX;

    // TAP or very small swipe → JUMP
    if (Math.abs(diffX) < 30) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    // Swipe right → move right
    if (diffX > 50) {
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }

    // Swipe left → move left
    if (diffX < -50) {
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinox - 112) + "px";
    }
}

// ==========================
// COLLISION + SCORE LOGIC
// ==========================

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetx = Math.abs(dx - ox);
    let offsety = Math.abs(dy - oy);

    if (offsetx < 113 && offsety < 52) {
        gameOver.innerHTML = "Game Over - Reload to play again";
        obstacle.classList.remove('obstacleAni');
        audio.pause();
        audiogo.play();
    } else if (offsetx < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 100);

function updateScore(score) {
    scorecont.innerHTML = "Your Score: " + score;
}
