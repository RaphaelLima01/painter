const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputColor = document.querySelector('#input-color');
let isDrawing = false;

// Pilhas para armazenar o histórico de estados do canvas
let undoStack = [];
let redoStack = [];

// Eventos de desenho
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Alterar a cor do traço
inputColor.addEventListener("change", ({target}) => {
    ctx.strokeStyle = target.value;
});

// Botões de limpar, desfazer e refazer
document.getElementById('btn-limpar').addEventListener('click', clearCanvas);
document.getElementById('btn-desfazer').addEventListener('click', undo);
document.getElementById('btn-refazer').addEventListener('click', redo);

function startDrawing(e) {
    isDrawing = true;
    saveState();  // Salvar estado ao iniciar o desenho
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Função para salvar o estado atual do canvas
function saveState() {
    undoStack.push(canvas.toDataURL());
    redoStack = [];  // Limpar a pilha de refazer quando um novo desenho é feito
}

// Função para limpar o canvas
function clearCanvas() {
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função de desfazer
function undo() {
    if (undoStack.length > 0) {
        redoStack.push(canvas.toDataURL());  // Salvar o estado atual na pilha de refazer
        let previousState = undoStack.pop();
        restoreState(previousState);
    }
}

// Função de refazer
function redo() {
    if (redoStack.length > 0) {
        undoStack.push(canvas.toDataURL());  // Salvar o estado atual na pilha de desfazer
        let nextState = redoStack.pop();
        restoreState(nextState);
    }
}

// Função para restaurar um estado salvo
function restoreState(state) {
    let img = new Image();
    img.src = state;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpar o canvas antes de restaurar o estado
        ctx.drawImage(img, 0, 0);
    }
}