//Holding core functionality such as Translate, Rotate and Scale

/**
* DrawableObject constructor
*/
function DrawableObject(x, y, color) {

    this.x = x;
    this.y = y;

    //default color
    this.color = color;

    this.engine = undefined;
    this.updateCallback = undefined;
    this.ctx = EngineUtils.canvasContext;
}

/**
 * Sets reference to the driving engine
 * @param {*} engine 
 */
DrawableObject.prototype.setEngine = function(engine)
{
    this.engine = engine;
}

/**
 * Sets reference to the update callback
 * @param {*} engine 
 */
DrawableObject.prototype.setUpdateCallback = function(updateCallback)
{
    this.updateCallback = updateCallback;
}


function Circle(radius, x, y, color){

    this.radius = radius;
    DrawableObject.call(this, x, y, color);
}

Circle.prototype = Object.create(DrawableObject.prototype);

/**
 * Update function which is called for each frame
 * @param {*} callback 
 */
Circle.prototype.update = function()
{
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    
    if(this.updateCallback)
    {
        this.updateCallback(this);
    }
}
