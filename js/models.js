/**
 * Base action class
 */
function Action(){

    this.action = null; 
    this.drawableObject = null;
}

/**
 * Used to chain async actions
 */
Action.prototype.attach = function(action){

    this.action = action;
    return this.action;
}

Action.prototype.addedBy = function(drawableObject){
    this.drawableObject = drawableObject;
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
    this.v_y = 0;
    this.v_x = 0;
    this.velocity = velocity;
}

//MoveTo extends Action
MoveTo.prototype = Object.create(Action.prototype);

MoveTo.prototype.addedBy = function(drawableObject){

    this.drawableObject = drawableObject;

    var polar_coordinates = EngineUtils.cartesianToPolar(this.x - drawableObject.x, this.y - drawableObject.y);

    this.v_x = this.velocity * Math.cos(polar_coordinates.tetha);
    this.v_y = this.velocity * Math.sin(polar_coordinates.tetha);
}

/**
 * Acts upon a drawable object
 * @param {*} drawableObject 
 */
MoveTo.prototype.act = function(){

    this.drawableObject.x = this.drawableObject.x + (this.v_x * this.drawableObject.engine.delta_time);
    this.drawableObject.y = this.drawableObject.y + (this.v_y * this.drawableObject.engine.delta_time);
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

    let _action = action; 

    while(_action){
        _action.addedBy(this);
        _action = _action.action;
    }

    this.actions.push(action);
}

DrawableObject.prototype.update = function()
{
    this.actions.forEach(function(action) {
        let _action = action; 

        while(_action){
            _action.act();
            _action = _action.action;
        }
        
    });
    
    if(this.updateCallback)
    {
        this.updateCallback(this);
    }
}

/**
 * Circle's conscructor
 * @param {*} radius 
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 */
function Circle(radius, x, y, color){

    this.radius = radius;
    DrawableObject.call(this, x, y, color);
}

//Circle extends DrawableObject
Circle.prototype = Object.create(DrawableObject.prototype);

/**
 * Update function which is called for each frame
 * 
 */
Circle.prototype.update = function()
{

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    DrawableObject.prototype.update.call(this);
}
