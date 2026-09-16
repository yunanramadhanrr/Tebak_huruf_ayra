// js/permainan.js
document.addEventListener('DOMContentLoaded', function() {
    const musicKeys = document.getElementById('musicKeys');
    const notes = [
        { note: 'Do', freq: 261.63, color: '#FF6B6B' },
        { note: 'Re', freq: 293.66, color: '#FF8E53' },
        { note: 'Mi', freq: 329.63, color: '#FFD93D' },
        { note: 'Fa', freq: 349.23, color: '#6BCB77' },
        { note: 'Sol', freq: 392.00, color: '#4D96FF' },
        { note: 'La', freq: 440.00, color: '#9B59B6' },
        { note: 'Si', freq: 493.88, color: '#FF69B4' },
        { note: 'Do²', freq: 523.25, color: '#00CED1' }
    ];

    notes.forEach(item => {
        const key = document.createElement('button');
        key.className = 'music-key';
        key.textContent = item.note;
        key.style.borderColor = item.color;
        key.style.color = item.color;
        key.addEventListener('click', () => {
            playTone(item.freq, 0.5);
            key.classList.add('playing');
            setTimeout(() => key.classList.remove('playing'), 150);
            speak(item.note);
        });
        musicKeys.appendChild(key);
    });
});