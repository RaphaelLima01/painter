const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputColor = document.querySelector('#input-color');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

inputColor.addEventListener("change", ({target}) => {
    ctx.strokeStyle = target.value;  // Agora altera a cor do traço
});

document.getElementById('btn-limpar').addEventListener('click', clearCanvas);

function startDrawing(e){
    isDrawing = true;
    draw(e);
}

function draw(e){
    if(!isDrawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDrawing(){
    isDrawing = false;
    ctx.beginPath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
