window.EngineUtils = {
    
    canvasContext : undefined,

    clearCanvas : function(){

        EngineUtils.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    },

    moveTo : function(drawableObject, xTo, yTo, velocity){

        drawableObject.x = drawableObject.x + (velocity*drawableObject.engine.delta_time);
    }
}