// js/tebak-angka.js
document.addEventListener('DOMContentLoaded', function() {
    const optionsGrid = document.getElementById('optionsGrid');
    const scoreEl = document.getElementById('score');
    const highScoreEl = document.getElementById('highScore');
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    const countingDisplay = document.getElementById('countingDisplay');

    let correctCount = 0;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('ayra_tebak_angka_high') || '0');
    let answered = false;

    highScoreEl.textContent = highScore;
    const emojis = ['🍎','⭐','🎈','🐱','🐶','🌸','🚗','🍌','🧸','🦋'];

    function newQuestion() {
        answered = false;
        correctCount = Math.floor(Math.random() * 10) + 1;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        countingDisplay.innerHTML = '';
        for (let i = 0; i < correctCount; i++) {
            const span = document.createElement('span');
            span.textContent = emoji;
            span.style.animation = `bounce 0.5s ease ${i * 0.1}s`;
            countingDisplay.appendChild(span);
        }

        const options = new Set([correctCount]);
        while (options.size < 4) options.add(Math.floor(Math.random() * 10) + 1);
        const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

        optionsGrid.innerHTML = '';
        shuffled.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = num;
            btn.addEventListener('click', () => checkAnswer(num, btn));
            optionsGrid.appendChild(btn);
        });

        feedbackEl.textContent = '';
        feedbackEl.className = 'game-feedback';
        nextBtn.style.display = 'none';
        setTimeout(() => speak('Ada berapa banyak?'), 300);
    }

    function checkAnswer(selected, btn) {
        if (answered) return;
        answered = true;

        if (selected === correctCount) {
            btn.classList.add('correct');
            score += 10;
            scoreEl.textContent = score;
            feedbackEl.textContent = '🎉 Benar! Hebat!';
            feedbackEl.className = 'game-feedback correct';
            playTone(880, 0.2);
            speak('Benar! Ada ' + correctCount);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('ayra_tebak_angka_high', highScore);
                highScoreEl.textContent = highScore;
            }
        } else {
            btn.classList.add('wrong');
            feedbackEl.textContent = '❌ Belum tepat. Jawabannya ' + correctCount;
            feedbackEl.className = 'game-feedback wrong';
            playTone(220, 0.4);
            speak('Belum tepat. Jawabannya ' + correctCount);
            document.querySelectorAll('.option-btn').forEach(b => {
                if (parseInt(b.textContent) === correctCount) b.classList.add('correct');
            });
        }
        document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
        nextBtn.style.display = 'inline-block';
    }

    nextBtn.addEventListener('click', newQuestion);
    newQuestion();
});