window.onload  = function() {

    var c = document.getElementById("canvas");
    EngineUtils.canvasContext = c.getContext("2d");

    var aniEngine = new AnimationEngine();

    var circle = new Circle(20, 100, 100, "#aaa");

    aniEngine.addDrawableObject(circle);

    //Used to override update and allows you to implement any custom motion here
    circle.setUpdateCallback((_this)=>{
        
        console.log("fps outside =>", Math.round(_this.engine.fps));
    });

    aniEngine.start();

    var actionRoot = new MoveTo(200,200, 100);

    actionRoot.attach(new MoveTo(0,0, 110))
    .attach(new MoveTo(-100, 200, 100));
    

    circle.addAction(actionRoot);

    setTimeout(()=>{

        aniEngine.stop();
    }, 5000);
    
}

