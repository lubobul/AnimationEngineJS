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
    this.actions = [];
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
 * @param {*} updateCallback 
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
 * Moves obect to postion
 * @param {*} x 
 * @param {*} y 
 * @param {*} velocity 
 */
Circle.prototype.moveTo = function(x, y, velocity)
{
    //TODO make sure you figure this out in a proper way
    this.actions.push({
        x : x,
        y : y,
        v: velocity,
        act: EngineUtils.moveTo
    });
}

/**
 * Update function which is called for each frame
 * @param {*} callback 
 */
Circle.prototype.update = function()
{
    let _this = this;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.actions.forEach(function(action) {

        //figure out how to call different actions with different signature
        action.act(_this, action.x, action.y, action.v);
    });
    
    if(this.updateCallback)
    {
        this.updateCallback(this);
    }
}
