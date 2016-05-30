var i, inputFrame, inputLength, inputPitch, inputStart, inputText, j, layerA, layerArray, minimap, music_playpause, music_skipleft, music_skipright, music_stop, newTone, program_open, program_save, program_settings,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

layerA = new Layer({
  width: 3500,
  height: 300
});

layerA.centerY();

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
      this.x = Math.round((event.pointX - this.parent.x - (this.width / 2)) / 100) * 100;
    }
    if (modulo(this.y, 25) !== 0) {
      return this.y = Math.round((event.pointY - this.parent.y - (this.height / 2)) / 25) * 25;
    }
  });
}

newTone = new Layer({
  height: 100,
  width: 100,
  image: "resources/addTone.png"
});

newTone.fluid({
  xAlign: 'right',
  xOffset: -5,
  yAlign: 'bottom',
  yOffset: -205
});


/*
animation = new Animation
  layer: targetLayer
  properties:
    x: 450
  curve: "ease-in-out"
  time: 1

reverseAnimation = animation.reverse()
 */

newTone.on(Events.Click, function() {
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
      this.x = Math.round((event.pointX - this.parent.x - (this.width / 2)) / 100) * 100;
    }
    if (modulo(this.y, 25) !== 0) {
      return this.y = Math.round((event.pointY - this.parent.y - (this.height / 2)) / 25) * 25;
    }
  });
});

inputFrame = new Layer({
  height: 200
});

inputFrame.fluid({
  yAlign: 'bottom',
  autoWidth: true
});

inputText = new Input({
  setup: true,
  placeholder: "Text",
  placeholderColor: "#fff",
  type: "text",
  width: window.innerWidth / 2 - 35,
  height: 50,
  parent: inputFrame
});

inputText.fluid({
  xOffset: 10,
  yOffset: -110,
  xAlign: 'left',
  yAlign: 'bottom'
});

inputStart = new Input({
  setup: true,
  placeholder: "Start",
  placeholderColor: "#fff",
  type: "number",
  width: window.innerWidth / 2 - 35,
  height: 50,
  parent: inputFrame
});

inputStart.fluid({
  xOffset: 10,
  yOffset: -30,
  xAlign: 'left',
  yAlign: 'bottom'
});

inputLength = new Input({
  setup: true,
  placeholder: "Länge",
  placeholderColor: "#fff",
  type: "number",
  width: window.innerWidth / 2 - 35,
  height: 50,
  parent: inputFrame
});

inputLength.fluid({
  xOffset: -30,
  yOffset: -110,
  xAlign: 'right',
  yAlign: 'bottom'
});

inputPitch = new Input({
  setup: true,
  placeholder: "Tonhöhe",
  placeholderColor: "#fff",
  type: "number",
  width: window.innerWidth / 2 - 35,
  height: 50,
  parent: inputFrame
});

inputPitch.fluid({
  xOffset: -30,
  yOffset: -30,
  xAlign: 'right',
  yAlign: 'bottom'
});


/*
inputColor = new Input
    setup: true # Change to true when positioning the input so you can see it
    virtualKeyboard: false # Enable or disable virtual keyboard for when viewing on computer
    placeholder: "Start"
    placeholderColor: "#fff"
    type: "color"
    width: Screen.width / 2
    height: 50

inputColor.fluid
  xOffset: (Screen.width / 2) + 5
  yOffset: -25
  autoWidth: true
  xAlign: 'left'
  yAlign: 'bottom'
 */


/*

video = new VideoPlayer
  x: 200
  y: 200
  video: "resources/video.mp4"

video.playButtonImage = "resources/button_play.jpg"
video.pauseButtonImage = "resources/button_stop.png"
video.showProgress = true
 */

music_skipleft = new Layer({
  height: 100,
  width: 100,
  image: "resources/music_skipleft.png"
});

music_playpause = new Layer({
  x: 100,
  height: 100,
  width: 100,
  image: "resources/music_playpause.png"
});

music_stop = new Layer({
  x: 200,
  height: 100,
  width: 100,
  image: "resources/music_stop.png"
});

music_skipright = new Layer({
  x: 300,
  height: 100,
  width: 100,
  image: "resources/music_skipright.png"
});


/*
programControl = new Layer
  height: 100
  width: 450
  image: "resources/TopBar Right.png"
programControl.fluid
  xAlign: 'right'
 */

program_open = new Layer({
  width: 100,
  height: 100,
  image: "resources/program_open.png"
});

program_open.fluid({
  xAlign: 'right',
  xOffset: -200
});

program_open.on(Events.Click, function() {
  var filereader;
  return filereader = new FileReader;
});

program_save = new Layer({
  width: 100,
  height: 100,
  image: "resources/program_save.png"
});

program_save.fluid({
  xAlign: 'right',
  xOffset: -100
});

program_settings = new Layer({
  width: 100,
  height: 100,
  image: "resources/program_settings.png"
});

program_settings.fluid({
  xAlign: 'right',
  xOffset: 0
});

minimap = new Layer({
  height: 100,
  y: 100
});

minimap.fluid({
  autoWidth: true
});

window.addEventListener('resize', (function(event) {
  return inputText.width = inputFrame.width / 2;
}), false);
