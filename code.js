var animation, i, j, layerA, layerArray, layerInput, reverseAnimation, reverseButton, startButton, stopButton, targetLayer,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

layerA = new Layer({
  width: 3500,
  height: 300
});

layerA.centerY();

layerInput = new Layer({
  html: "<input id='vname' name='vname'>"
});

layerA.draggable.enabled = true;

layerA.draggable.overdrag = false;

layerA.draggable.bounce = false;

layerA.draggable.momentum = false;

layerA.draggable.horizontal = true;

layerA.draggable.vertical = false;

layerA.draggable.constraints = {
  x: Canvas.width - layerA.width,
  width: 2 * layerA.width - Canvas.width
};

layerArray = [layerA];

for (i = j = 1; j <= 5; i = ++j) {
  layerArray[i] = new Layer({
    x: i * 100,
    y: 50,
    width: 100,
    height: 50,
    image: "resources/Block1.png"
  });
  layerA.addSubLayer(layerArray[i]);
  layerArray[i].draggable.enabled = true;
  layerArray[i].draggable.overdrag = false;
  layerArray[i].draggable.bounce = false;
  layerArray[i].draggable.momentum = false;
  layerArray[i].draggable.constraints = {
    width: layerA.width,
    height: layerA.height
  };
  layerArray[i].onDragStart(function() {
    return layerA.draggable.enabled = false;
  });
  layerArray[i].onDragEnd(function() {
    return layerA.draggable.enabled = true;
  });
  layerArray[i].onDragMove(function(event) {
    if (modulo(this.x, 100) !== 0) {
      this.x = Math.round((event.pointX - layerA.x - (this.width / 2)) / 100) * 100;
    }
    if (modulo(this.y, 25) !== 0) {
      return this.y = Math.round((event.pointY - layerA.y - (this.height / 2)) / 25) * 25;
    }
  });
}

targetLayer = new Layer({
  x: 20,
  y: 20
});

Utils.labelLayer(targetLayer, "targetLayer");

startButton = new Layer({
  x: 20,
  y: 700,
  height: 50,
  backgroundColor: "#ff7606"
});

Utils.labelLayer(startButton, "Start");

reverseButton = startButton.copy();

reverseButton.x = 260;

Utils.labelLayer(reverseButton, "Reverse");

stopButton = startButton.copy();

stopButton.x = 500;

Utils.labelLayer(stopButton, "Stop");

animation = new Animation({
  layer: targetLayer,
  properties: {
    x: 450
  },
  curve: "ease-in-out",
  time: 1
});

reverseAnimation = animation.reverse();

startButton.on(Events.Click, function() {
  i = layerArray.length;
  layerArray[i] = new Layer({
    x: i * 100,
    y: 50,
    width: 100,
    height: 50,
    image: "resources/Block1.png"
  });
  layerA.addSubLayer(layerArray[i]);
  layerArray[i].draggable.enabled = true;
  layerArray[i].draggable.overdrag = false;
  layerArray[i].draggable.bounce = false;
  layerArray[i].draggable.momentum = false;
  layerArray[i].draggable.constraints = {
    width: layerA.width,
    height: layerA.height
  };
  layerArray[i].onDragStart(function() {
    return layerA.draggable.enabled = false;
  });
  layerArray[i].onDragEnd(function() {
    return layerA.draggable.enabled = true;
  });
  return layerArray[i].onDragMove(function(event) {
    if (modulo(this.x, 100) !== 0) {
      this.x = Math.round((event.pointX - layerA.x - (this.width / 2)) / 100) * 100;
    }
    if (modulo(this.y, 25) !== 0) {
      return this.y = Math.round((event.pointY - layerA.y - (this.height / 2)) / 25) * 25;
    }
  });
});

stopButton.on(Events.Click, function() {
  return targetLayer.animateStop();
});

reverseButton.on(Events.Click, function() {
  return reverseAnimation.start();
});


/*

video = new VideoPlayer
  x: 200
  y: 200
  video: "resources/video.mp4"



video.playButtonImage = "resources/button_play.jpg"
video.pauseButtonImage = "resources/button_stop.png"
video.showProgress = true



input = new InputModule.Input
    setup: false # Change to true when positioning the input so you can see it
    virtualKeyboard: true # Enable or disable virtual keyboard for when viewing on computer
    placeholder: "Username"
    placeholderColor: "#fff"
    type: "text" # Use any of the available HTML input types. Take into account that on the computer the same keyboard image will appear regarding the type used.
    y: 240
    x: 90
    width: 500
    height: 60
 */
