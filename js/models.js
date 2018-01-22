/**
 * Base action class
 */
class Action{

    constructor(){

        this.next = null; 
        this.shape = null;
    }

    /**
     * Used to chain async actions
     */
    attach(action){

        this.next = action;
        return this.next;
    }

    addedBy(shape){
        this.shape = shape;
    }

}



class Scale extends Action{

    /**
    * Scale Action
    * @param {*} factor 
    */
    constructor(factor){

        super();
        this.factor = factor;
    }

    /**
     * Acts upon a drawable object
     * @param {*} shape 
     */
    act(){

        EngineUtils.canvasContext.scale(factor, factor);
    }
}

/**
 * MoveTo Action 
 * @param {*} x 
 * @param {*} y 
 * @param {*} velocity 
 */

class MoveTo extends Action{

    constructor(x, y, velocity){

        super();

        this.x = x;
        this.y = y;
        this.v_y = 0;
        this.v_x = 0;
        this.velocity = velocity;
    }

    addedBy(shape){

        this.shape = shape;

        var polar_coordinates = EngineUtils.cartesianToPolar(this.x - shape.x, this.y - shape.y);

        this.v_x = this.velocity * Math.cos(polar_coordinates.tetha);
        this.v_y = this.velocity * Math.sin(polar_coordinates.tetha);
    }

    /**
     * Acts upon a drawable object
     * @param {*} shape 
     */
    act(){

        this.shape.x = this.shape.x + (this.v_x * this.shape.engine.delta_time);
        this.shape.y = this.shape.y + (this.v_y * this.shape.engine.delta_time);
    }
}

/**
 * Base shape
 */
class Shape{

    /**
     * Shape constructor
     * @param {*} x 
     * @param {*} y 
     * @param {*} color 
     * @param {*} type 
     */
    constructor (x, y, color, type) {

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
    setEngine(engine)
    {
        this.engine = engine;
    }

    /**
     * Sets reference to the update callback
     * @param {*} updateCallback 
     */
    setUpdateCallback(updateCallback)
    {
        this.updateCallback = updateCallback;
    }

    /**
     * Adds a new action to the object
     * @param {*} action 
     */
    addAction(action)
    {

        let _action = action; 

        while(_action){
            _action.addedBy(this);
            _action = _action.next;
        }

        this.actions.push(action);
    }

    update()
    {
        this.actions.forEach(function(action) {

            let _action = action; 

            while(_action){
                _action.act();
                _action = _action.next;
            }

        });

        if(this.updateCallback)
        {
            this.updateCallback(this);
        }
    }
}

class Circle extends Shape {
    
    /**
     * Circle's conscructor
     * @param {*} radius 
     * @param {*} x 
     * @param {*} y 
     * @param {*} color 
     */
    constructor(radius, x, y, color){

        super(x, y, color);
        this.radius = radius;    
    }
    
    /**
     * Update function which is called for each frame
     * 
     */
    update()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    
        super.update();
    }
}
