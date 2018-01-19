window.onload  = function() {

    var c = document.getElementById("canvas");
    EngineUtils.canvasContext = c.getContext("2d");

    var aniEngine = new AnimationEngine("");

    var circle = new Circle(20, 100, 100, "#aaa");

    aniEngine.addDrawableObject(circle);

    circle.setUpdateCallback((_this)=>{
        
        console.log("fps outside =>", Math.round(_this.engine.fps));
    });

    aniEngine.start();

    setTimeout(()=>{

        aniEngine.stop();
    }, 3000);
    
}

