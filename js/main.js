window.onload  = function() {

    var canvas = document.getElementById("canvas");
    EngineUtils.setCanvas(canvas);

    var aniEngine = new AnimationEngine();

    var circle = new Circle(20, 100, 100, "#aaa");
    var circle2 = new Circle(40, 100, 200, "green");

    aniEngine.addShape(circle);
    aniEngine.addShape(circle2);

    //Used to override update and allows you to implement any custom motion here
    circle.setUpdateCallback((shape)=>{
        
        console.log("fps outside =>", Math.round(shape.engine.fps));
    });

    aniEngine.start();

    var actionRoot = new MoveTo(200,200, 100);

    //actionRoot.attach(new MoveTo(0,0, 110))
    //.attach(new MoveTo(-100, 200, 100));

    var actionRoot2 = new MoveTo(200,200, 100);

    circle.addAction(actionRoot);
    circle2.addAction(actionRoot2);

    setTimeout(()=>{

        aniEngine.stop();
    }, 5000);
    
}

