const imageInput = document.getElementById('imageInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const resizeBtn = document.getElementById('resizeBtn');
const imageCanvas = document.getElementById('imageCanvas');
const presetButtons = document.querySelectorAll('.preset-btn');
const downloadLink = document.getElementById('downloadLink');

function resizeImage(file) {
    if (!file) {
        alert('Please upload an image!');
        return;
    }

    const img = new Image();
    const reader = new FileReader();
    reader.onloadstart = () => imageCanvas.width = imageCanvas.height = 0; // Reset canvas size
    
    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
            const canvas = imageCanvas;
            const ctx = canvas.getContext('2d');

            const width = parseInt(widthInput.value) || img.width;
            const height = parseInt(heightInput.value) || img.height;

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            // Prepare for download
            downloadLink.href = canvas.toDataURL();
        };
    };
    reader.readAsDataURL(file);
}

resizeBtn.addEventListener('click', () => resizeImage(imageInput.files[0]));
presetButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const width = parseInt(button.getAttribute('data-width'));
        const height = parseInt(button.getAttribute('data-height'));
        resizeImage(width, height);
    });
});
