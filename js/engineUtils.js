window.EngineUtils = {
    
    setCanvas : function(canvas)
    {
        EngineUtils.canvas = canvas;
        EngineUtils.canvasContext = canvas.getContext("2d");
    },

    clearCanvas : function()
    {    
        EngineUtils.canvasContext.clearRect(0, 0, EngineUtils.canvas.width, EngineUtils.canvas.height);
    },

    /**
     * Degrees to radians
     */
    degToRad : function (deg)
    {
        return (Math.PI / 180) * deg;
    },

    /**
     * Cartesian to polar coordinates 
     */
    cartesianToPolar : function (x, y)
    {
        var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var tetha = Math.atan2(y, x);

        return { radius, tetha }
    }
}