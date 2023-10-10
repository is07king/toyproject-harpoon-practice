$(document).ready(() => {
    var socket = io()

    var canvas = $("#place")[0]
    var ctx = canvas.getContext("2d")

    socket.on("canvas", canvasData => {
        canvasData.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                ctx.fillStyle = col
                ctx.fillRect(colIndex * 10, rowIndex * 10, 10, 10)
            })
        })
    })

    $("#submit").click(() => {
        socket.emit("color", {
            col: parseInt($("#x-coord").val()),
            row: parseInt($("#y-coord").val()),
            color: $("#color").val()
        })
    })

    function getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
    
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
    
        // Ensure the mouse coordinates are within the canvas range
        const canvasX = Math.min(canvas.width, Math.max(0, mouseX)) / 10;
        const canvasY = Math.min(canvas.height, Math.max(0, mouseY)) / 10;
    
        return { x: canvasX, y: canvasY };
    }
    
    // Example usage
    canvas.addEventListener('click', event => {
        const mousePos = getMousePos(canvas, event);
        console.log('Mouse position on canvas:', mousePos);
    
        handleCanvasClick(mousePos);
    });
    
    function handleCanvasClick(mousePos) {
        socket.emit("color", {
            col: parseInt(Math.round(mousePos.x)),
            row: parseInt(Math.round(mousePos.y)),
            color: $("#color").val()
        });
    }
})