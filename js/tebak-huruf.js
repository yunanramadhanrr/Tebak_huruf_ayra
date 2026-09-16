// js/tebak-huruf.js
document.addEventListener('DOMContentLoaded', function() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const optionsGrid = document.getElementById('optionsGrid');
    const scoreEl = document.getElementById('score');
    const highScoreEl = document.getElementById('highScore');
    const feedbackEl = document.getElementById('feedback');
    const speakBtn = document.getElementById('speakBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentLetter = '';
    let score = 0;
    let highScore = parseInt(localStorage.getItem('ayra_tebak_huruf_high') || '0');
    let answered = false;

    highScoreEl.textContent = highScore;

    function randomLetter() {
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    function generateOptions(correct) {
        const options = new Set([correct]);
        while (options.size < 4) options.add(randomLetter());
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    function newQuestion() {
        answered = false;
        currentLetter = randomLetter();
        const options = generateOptions(currentLetter);

        optionsGrid.innerHTML = '';
        options.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = letter;
            btn.addEventListener('click', () => checkAnswer(letter, btn));
            optionsGrid.appendChild(btn);
        });

        feedbackEl.textContent = '';
        feedbackEl.className = 'game-feedback';
        nextBtn.style.display = 'none';
        speakBtn.style.display = 'inline-block';
        setTimeout(() => speak('Huruf ' + currentLetter), 300);
    }

    function checkAnswer(selected, btn) {
        if (answered) return;
        answered = true;

        if (selected === currentLetter) {
            btn.classList.add('correct');
            score += 10;
            scoreEl.textContent = score;
            feedbackEl.textContent = '🎉 Benar! Hebat!';
            feedbackEl.className = 'game-feedback correct';
            playTone(880, 0.2);
            speak('Benar! Huruf ' + currentLetter);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('ayra_tebak_huruf_high', highScore);
                highScoreEl.textContent = highScore;
            }
        } else {
            btn.classList.add('wrong');
            feedbackEl.textContent = '❌ Belum tepat. Jawabannya ' + currentLetter;
            feedbackEl.className = 'game-feedback wrong';
            playTone(220, 0.4);
            speak('Belum tepat. Yang benar adalah ' + currentLetter);
            document.querySelectorAll('.option-btn').forEach(b => {
                if (b.textContent === currentLetter) b.classList.add('correct');
            });
        }
        document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
        speakBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    }

    speakBtn.addEventListener('click', () => currentLetter && speak('Huruf ' + currentLetter));
    nextBtn.addEventListener('click', newQuestion);
    newQuestion();
});