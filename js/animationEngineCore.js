/**
* Holding core functionality such as Translate, Rotate and Scale
*/

/**
* Circle object
*/

function Circle(canvasContext) {

    this.canvasContext = canvasContext;
    this.engine = undefined;
}

/**
 * Sets reference to the driving engine
 * @param {*} engine 
 */
Circle.prototype.setEngine = function(engine)
{
    this.engine = engine;
}

/**
 * Update function which is called for each frame
 * @param {*} callback 
 */
Circle.prototype.update = function()
{
    console.log("fps=>", this.engine.fps);
    //callback.call();
}
