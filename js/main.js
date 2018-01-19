window.onload  = function() {

    var aniEngine = new AnimationEngine("");
    var drawableObject = new Circle();
    aniEngine.subscribeAnimationFrameCallback(drawableObject);
    aniEngine.start();
}
