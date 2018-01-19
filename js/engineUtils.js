window.EngineUtils = {
    
    canvasContext : undefined,

    clearCanvas : function(){

        EngineUtils.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
}