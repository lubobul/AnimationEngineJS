/**
 * Creates global requestAnimFrame var assigned to a function accepting the callback
 */
window.requestAnimFrame = (function (callback) {
    return  window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     || 
            window.oRequestAnimationFrame       || 
            window.msRequestAnimationFrame      ||

    //a fallback primitive function if none of the above are defined    
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * AnimationEngine's Constructor
 */
function AnimationEngine() {

    this.animationFrameCallback = undefined;
    this.subscribtions = [];
    
    this.prev_time_log = undefined;
    this.is_running = true;
    this.fps = 0;
    this.delta_time = 0;
}

/**
 * Use to subscribe a drawable object which will be updated for each frame (normally called 60/sec)
 * @param {*} drawableObject 
 */
AnimationEngine.prototype.addDrawableObject = function(drawableObject)
{
    drawableObject.setEngine(this);
    this.subscribtions.push(drawableObject);
}

/**
 * Starts the animation engine
 */
AnimationEngine.prototype.start = function()
{
    this.is_running = true;
    this.animate();
}

/**
 * Stops the animation engine
 */
AnimationEngine.prototype.stop = function()
{
    this.is_running = false;
}

/**
 * Main function
 */
AnimationEngine.prototype.animate = function()
{
    let _this = this;
    
     if (!this.prev_time_log) {
        this.prev_time_log = new Date().getTime();

        window.requestAnimFrame(function () {
            _this.animate();  
        });

        return;
    }
    
    //calculate dt in seconds
    this.delta_time = (new Date().getTime() - this.prev_time_log) / 1000;

    this.prev_time_log = new Date().getTime();

    //calculate fps
    this.fps = 1 / this.delta_time;

    EngineUtils.clearCanvas();

    //call each subscribed object
    this.subscribtions.forEach(function(drawableObject) {

        drawableObject.update();
    });

    if (this.is_running) {
        window.requestAnimFrame(function () {
            _this.animate();
        });
    }
}