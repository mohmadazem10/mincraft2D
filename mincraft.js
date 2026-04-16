const button = document.querySelector('#btn');
const players = document.querySelector('.players');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const player3 = document.querySelector('.player3');
const player4 = document.querySelector('.player4');
const player5 = document.querySelector('.player5');
const world = document.querySelector('#world');
const startgame = document.querySelector('.start-game');
const mit = document.querySelector('.mit');
const pr1 = document.querySelector('.pr1');
const pr2 = document.querySelector('.pr2');
const pr3 = document.querySelector('.pr3');
const pr4 = document.querySelector('.pr4');
const pr5 = document.querySelector('.pr5');
const prs = [pr1, pr2, pr3, pr4, pr5];
const j1 = document.querySelector('.j1');
const j2 = document.querySelector('.j2');
const j3 = document.querySelector('.j3');
const j4 = document.querySelector('.j4');
const j5 = document.querySelector('.j5');
const js = [j1, j2, j3, j4, j5];
startgame.style.display = 'none';
world.style.display = 'none';
prs.forEach(pr => pr.style.display = 'none');
js.forEach(j => j.style.display = 'none');

function minecraft() {
  // إظهار مع حركة
  mit.classList.add('show');
  // إخفاء بعد 3 ثواني
  setTimeout(() => {
    mit.classList.remove('show');
  }, 3000);
  setTimeout(() => {
    startgame.style.display = 'block';
  }, 4000);
}
minecraft();

button.onclick = function() {
 world.style.display = 'block';
 startgame.style.display = 'none';
}
player1.onclick = function() {
  player1.style.display = 'none';
  player2.style.display = 'none';
  player3.style.display = 'none';
  player4.style.display = 'none';
  player5.style.display = 'none';
  pr1.style.display = 'block';

}
player2.onclick = function() {
  player1.style.display = 'none';
  player2.style.display = 'none';
  player3.style.display = 'none';
  player4.style.display = 'none';
  player5.style.display = 'none';
  pr2.style.display = 'block';
 
} 
player3.onclick = function() {
  player1.style.display = 'none';
  player2.style.display = 'none';
  player3.style.display = 'none';
  player4.style.display = 'none';
  player5.style.display = 'none';
  pr3.style.display = 'block';
  
}
player4.onclick = function() {
  player1.style.display = 'none';
  player2.style.display = 'none';
  player3.style.display = 'none';
  player4.style.display = 'none';
  player5.style.display = 'none';
  pr4.style.display = 'block';
  
}
player5.onclick = function() {
  player1.style.display = 'none';
  player2.style.display = 'none';
  player3.style.display = 'none';
  player4.style.display = 'none';
  player5.style.display = 'none';
  pr5.style.display = 'block';
  
}
let isJumping = false; // متغير لمنع القفز المتكرر أثناء وجود اللاعب في الهواء

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && !isJumping) {
        
        // البحث عن اللاعب الظاهر حالياً (من pr1 إلى pr5)
        let activePr = null;
        let activeJ = null;

        for (let i = 0; i < prs.length; i++) {
            if (prs[i].style.display === 'block') {
                activePr = prs[i];
                activeJ = js[i];
                break;
            }
        }

        // إذا وجدنا لاعباً نشطاً، نفذ القفزة
        if (activePr && activeJ) {
            isJumping = true; // تفعيل القفل

            activePr.style.display = 'none'; // إخفاء صورة الوقوف
            activeJ.style.display = 'block'; // إظهار صورة القفز
            activeJ.classList.add('jump-animation'); // تشغيل الحركة

            setTimeout(() => {
                activeJ.classList.remove('jump-animation');
                activeJ.style.display = 'none';
                activePr.style.display = 'block';
                isJumping = false; // فتح القفل بعد الهبوط
            }, 500); // مدة مطابقة للـ CSS
        }
    }
});
// 1. تعريف العوائق (المربعات)
const obstacles = [
    document.querySelector('.img1'),
    document.querySelector('.img2'),
    document.querySelector('.img3'),
    document.querySelector('.img4')
];

// إعدادات السرعة والحركة
let obstacleSpeeds = [5, 7, 6, 8]; // سرعات مختلفة لكل مربع

function moveObstacles() {
    obstacles.forEach((obs, index) => {
        // تحريك المربع لليسار
        let currentLeft = parseInt(window.getComputedStyle(obs).left);
        
        if (currentLeft < -100) {
            // إذا خرج المربع من اليسار، أعده لليمين بمكان وسرعة عشوائية
            obs.style.left = (window.innerWidth + Math.random() * 500) + 'px';
            obstacleSpeeds[index] = 4 + Math.random() * 6; // سرعة عشوائية جديدة
        } else {
            obs.style.left = (currentLeft - obstacleSpeeds[index]) + 'px';
        }

        // 2. فحص التصادم
        checkCollision(obs);
    });

    requestAnimationFrame(moveObstacles);
}

function checkCollision(obstacle) {
    // تحديد اللاعب النشط حالياً
    let activePr = prs.find(pr => pr.style.display === 'block');
    let activeJ = js.find(j => j.style.display === 'block');
    let player = activePr || activeJ;

    if (!player || world.style.display === 'none') return;

    // الحصول على إحداثيات اللاعب والمربع
    const pRect = player.getBoundingClientRect();
    const oRect = obstacle.getBoundingClientRect();

    // معادلة التصادم
    const isColliding = (
        pRect.left < oRect.right &&
        pRect.right > oRect.left &&
        pRect.top < oRect.bottom &&
        pRect.bottom > oRect.top
    );

    if (isColliding) {
        // إذا حدث تصادم:
        // إذا كان اللاعب فوق المربع (قفز ناجح) لا نفعل شيء أو نحسب نقطة
        // إذا اصطدم به من الجنب (خسارة)
        if (pRect.bottom > oRect.top + 20) { 
            alert("Game Over! لقد اصطدمت بالمربع");
            location.reload(); // إعادة تشغيل اللعبة
        }
    }
}

// ابدأ تحريك المربعات عند الضغط على زر Start
button.addEventListener('click', () => {
    moveObstacles();
});
  

