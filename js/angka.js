// js/angka.js
const numberData = [
    { number: 1, word: 'Satu', emoji: '🍎', speak: 'Satu' },
    { number: 2, word: 'Dua', emoji: '🍎🍎', speak: 'Dua' },
    { number: 3, word: 'Tiga', emoji: '🍎🍎🍎', speak: 'Tiga' },
    { number: 4, word: 'Empat', emoji: '🍎🍎🍎🍎', speak: 'Empat' },
    { number: 5, word: 'Lima', emoji: '🍎🍎🍎🍎🍎', speak: 'Lima' },
    { number: 6, word: 'Enam', emoji: '⭐'.repeat(6), speak: 'Enam' },
    { number: 7, word: 'Tujuh', emoji: '⭐'.repeat(7), speak: 'Tujuh' },
    { number: 8, word: 'Delapan', emoji: '⭐'.repeat(8), speak: 'Delapan' },
    { number: 9, word: 'Sembilan', emoji: '⭐'.repeat(9), speak: 'Sembilan' },
    { number: 10, word: 'Sepuluh', emoji: '⭐'.repeat(10), speak: 'Sepuluh' },
    { number: 11, word: 'Sebelas', emoji: '🎈'.repeat(11), speak: 'Sebelas' },
    { number: 12, word: 'Dua Belas', emoji: '🎈'.repeat(12), speak: 'Dua belas' },
    { number: 13, word: 'Tiga Belas', emoji: '🎈'.repeat(13), speak: 'Tiga belas' },
    { number: 14, word: 'Empat Belas', emoji: '🎈'.repeat(14), speak: 'Empat belas' },
    { number: 15, word: 'Lima Belas', emoji: '🎈'.repeat(15), speak: 'Lima belas' },
    { number: 16, word: 'Enam Belas', emoji: '🌟'.repeat(16), speak: 'Enam belas' },
    { number: 17, word: 'Tujuh Belas', emoji: '🌟'.repeat(17), speak: 'Tujuh belas' },
    { number: 18, word: 'Delapan Belas', emoji: '🌟'.repeat(18), speak: 'Delapan belas' },
    { number: 19, word: 'Sembilan Belas', emoji: '🌟'.repeat(19), speak: 'Sembilan belas' },
    { number: 20, word: 'Dua Puluh', emoji: '🌟'.repeat(20), speak: 'Dua puluh' }
];

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('numberGrid');
    const modal = document.getElementById('numberModal');
    const modalNumber = document.getElementById('modalNumber');
    const modalObject = document.getElementById('modalObject');
    const modalClose = document.getElementById('modalClose');
    const modalSpeak = document.getElementById('modalSpeak');
    let currentSpeak = '';

    numberData.forEach(function(item, index) {
        const card = document.createElement('div');
        card.className = 'number-card';
        card.setAttribute('tabindex', '0');
        card.innerHTML = `
            <span class="number-big">${item.number}</span>
            <span class="letter-object">${item.word}</span>
        `;
        const hue = (index * 137.5 + 180) % 360;
        const big = card.querySelector('.number-big');
        big.style.background = `linear-gradient(135deg, hsl(${hue},65%,55%), hsl(${hue+30},65%,45%))`;
        big.style.webkitBackgroundClip = 'text';
        big.style.backgroundClip = 'text';

        card.addEventListener('click', () => openNumber(item));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openNumber(item); }
        });
        grid.appendChild(card);
    });

    function openNumber(item) {
        modalNumber.textContent = item.number;
        const emoji = item.emoji.length > 20 ? item.emoji.substring(0,17) + '...' : item.emoji;
        modalObject.textContent = item.word + ' ' + emoji;
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