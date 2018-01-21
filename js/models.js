/**
 * Base action class
 */
function Action(){

    this.action = undefined; 
}

/**
 * Used to chain async actions
 */
Action.prototype.attach = function(action){

    this.action = action;
    return this.action;
}

/**
 * MoveTo Action 
 * @param {*} x 
 * @param {*} y 
 * @param {*} velocity 
 */
function MoveTo(x, y, velocity){

    Action.call(this);
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}

MoveTo.prototype = Object.create(Action.prototype);

/**
 * Acts upon a drawable object
 * @param {*} drawableObject 
 */
MoveTo.prototype.act = function(drawableObject){

    drawableObject.x = drawableObject.x + (this.velocity*drawableObject.engine.delta_time);
}

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

/**
 * Adds a new action to the object
 * @param {*} action 
 */
DrawableObject.prototype.addAction = function(action)
{
    //TODO make sure you figure this out in a proper way
    this.actions.push(action);
}


function Circle(radius, x, y, color){

    this.radius = radius;
    DrawableObject.call(this, x, y, color);
}

Circle.prototype = Object.create(DrawableObject.prototype);

/**
 * Update function which is called for each frame
 * 
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
        action.act(_this);
    });
    
    if(this.updateCallback)
    {
        this.updateCallback(this);
    }
}
