/**
 * Creates global requestAnimFrame var assigned to a function acception the callback
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
    
    this.prev_time_log = undefined;
    this.is_running = true;
    this.fps = 0;
    this.delta_time = 0;
}

/**
 * Use to set the callback function which you will be using for each frame (normally called 60/sec)
 * @param {*} callback 
 */
AnimationEngine.prototype.setAnimationFrameCallback = function(callback)
{
    this.animationFrameCallback = callback;
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
    var _this = this;
    
     if (!this.prev_time_log) {
        this.prev_time_log = new Date().getTime();

        window.requestAnimFrame(function () {
            _this.animate();  
        });

        return;
    }
    
    this.delta_time = (new Date().getTime() - this.prev_time_log) / 1000;

    this.prev_time_log = new Date().getTime();

    //calculate fps
    this.fps = 1 / this.delta_time;

    this.animationFrameCallback();

    if (this.is_running) {
        window.requestAnimFrame(function () {
            _this.animate();
        });
    }
}