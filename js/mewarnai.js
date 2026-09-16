// js/mewarnai.js
document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#FF6B6B','#FF8E53','#FFD93D','#6BCB77','#4D96FF',
        '#9B59B6','#FF69B4','#00CED1','#FFB347','#87CEEB',
        '#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF',
        '#FFFFFF','#333333','#8B4513','#FFC0CB','#98FB98'
    ];
    let selectedColor = '#FF6B6B';

    const palette = document.getElementById('colorPalette');
    colors.forEach((color, i) => {
        const swatch = document.createElement('button');
        swatch.className = 'color-swatch' + (i === 0 ? ' selected' : '');
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            selectedColor = color;
        });
        palette.appendChild(swatch);
    });

    document.querySelectorAll('.colorable').forEach(el => {
        el.addEventListener('click', () => el.setAttribute('fill', selectedColor));
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        document.querySelectorAll('.colorable').forEach(el => el.setAttribute('fill', '#FFFFFF'));
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
        const svg = document.getElementById('coloringCanvas');
        const data = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([data], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mewarnai-ayra-kids.svg';
        a.click();
        URL.revokeObjectURL(url);
    });
});