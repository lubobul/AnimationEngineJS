window.onload  = function() {

    var canvas = document.getElementById("canvas");
    EngineUtils.setCanvas(canvas);

    var aniEngine = new AnimationEngine();

    var circle = new Circle(40, 100, 100, "#aaa");

    var circle2 = new Circle(30, 200, 200, "green");

    aniEngine.addShape(circle);
    aniEngine.addShape(circle2);

    //Used to override update and allows you to implement any custom motion here
    circle.setUpdateCallback((shape)=>{
        
        //console.log("fps outside =>", Math.round(shape.engine.fps));
    });

    aniEngine.start();

    var actionRoot = new Scale(3.14, 0.2);//new MoveTo(200,200, 200);
    //actionRoot.attach(new MoveTo(200,200, 100));
    //actionRoot.attach(new MoveTo(0,0, 110))
    //.attach(new MoveTo(-100, 200, 100));

    var actionRoot2 = new MoveTo(400,200, 100);//new MoveTo(200,200, 20);
    //actionRoot2.attach(new Scale(0.5, 0.5));

    circle.addAction(actionRoot);
    circle2.addAction(actionRoot2);

    setTimeout(()=>{

        aniEngine.stop();
        console.log("Engine terminated");
    }, 10000);
    
}

