// js/huruf.js
const letterData = [
    { letter: 'A', object: 'Apel 🍎', speak: 'A, Apel' },
    { letter: 'B', object: 'Bola ⚽', speak: 'B, Bola' },
    { letter: 'C', object: 'Ceri 🍒', speak: 'C, Ceri' },
    { letter: 'D', object: 'Dadu 🎲', speak: 'D, Dadu' },
    { letter: 'E', object: 'Ember 🪣', speak: 'E, Ember' },
    { letter: 'F', object: 'Foto 📸', speak: 'F, Foto' },
    { letter: 'G', object: 'Gajah 🐘', speak: 'G, Gajah' },
    { letter: 'H', object: 'Harimau 🐯', speak: 'H, Harimau' },
    { letter: 'I', object: 'Ikan 🐟', speak: 'I, Ikan' },
    { letter: 'J', object: 'Jeruk 🍊', speak: 'J, Jeruk' },
    { letter: 'K', object: 'Kucing 🐱', speak: 'K, Kucing' },
    { letter: 'L', object: 'Lampu 💡', speak: 'L, Lampu' },
    { letter: 'M', object: 'Mobil 🚗', speak: 'M, Mobil' },
    { letter: 'N', object: 'Nanas 🍍', speak: 'N, Nanas' },
    { letter: 'O', object: 'Ombak 🌊', speak: 'O, Ombak' },
    { letter: 'P', object: 'Pisang 🍌', speak: 'P, Pisang' },
    { letter: 'Q', object: 'Quran 📖', speak: 'Q, Quran' },
    { letter: 'R', object: 'Rumah 🏠', speak: 'R, Rumah' },
    { letter: 'S', object: 'Sapi 🐄', speak: 'S, Sapi' },
    { letter: 'T', object: 'Topi 🎩', speak: 'T, Topi' },
    { letter: 'U', object: 'Ular 🐍', speak: 'U, Ular' },
    { letter: 'V', object: 'Vas 🏺', speak: 'V, Vas' },
    { letter: 'W', object: 'Wortel 🥕', speak: 'W, Wortel' },
    { letter: 'X', object: 'Xilofon 🎶', speak: 'X, Xilofon' },
    { letter: 'Y', object: 'Yoyo 🪀', speak: 'Y, Yoyo' },
    { letter: 'Z', object: 'Zebra 🦓', speak: 'Z, Zebra' }
];

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('letterGrid');
    const modal = document.getElementById('letterModal');
    const modalLetter = document.getElementById('modalLetter');
    const modalObject = document.getElementById('modalObject');
    const modalClose = document.getElementById('modalClose');
    const modalSpeak = document.getElementById('modalSpeak');
    let currentSpeak = '';

    letterData.forEach(function(item, index) {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.setAttribute('tabindex', '0');
        card.innerHTML = `
            <span class="letter-big">${item.letter}</span>
            <span class="letter-object">${item.object}</span>
        `;
        const hue = (index * 137.5) % 360;
        const big = card.querySelector('.letter-big');
        big.style.background = `linear-gradient(135deg, hsl(${hue},70%,60%), hsl(${hue+30},70%,50%))`;
        big.style.webkitBackgroundClip = 'text';
        big.style.backgroundClip = 'text';

        card.addEventListener('click', () => openLetter(item));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(item); }
        });
        grid.appendChild(card);
    });

    function openLetter(item) {
        modalLetter.textContent = item.letter;
        modalObject.textContent = item.object;
        currentSpeak = item.speak;
        modal.classList.add('active');
        speak(item.speak);
    }
    function closeModal() {
        modal.classList.remove('active');
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
    modalSpeak.addEventListener('click', () => currentSpeak && speak(currentSpeak));
});