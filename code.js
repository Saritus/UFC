var checkArray, i, inputFrame, inputLength, inputPitch, inputStart, inputText, j, layerA, layerArray, minimap, minimapSelection, music_line, music_playpause, music_skipleft, music_skipright, music_stop, newTone, playing, program_open, program_save, program_settings, settings, settings_programm, settings_projekt;

checkArray = function(x, y) {
  return square(x) * x;
};

layerA = new Layer({
  width: 3500,
  height: 300
});

layerA.centerY();

layerA.fluid({
  yAlign: 'bottom',
  yOffset: -350
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
  layerArray[i].id = layerArray.length;
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
    layerA.draggable.enabled = false;
    this.oldX = this.x;
    return this.oldY = this.y;
  });
  layerArray[i].onDragEnd(function() {
    return layerA.draggable.enabled = true;
  });
  layerArray[i].onDragMove(function(event) {
    var bubble, equals, k, len, newX, newY;
    newX = Math.round((event.pointX - this.parent.x - (this.width / 2)) / 50) * 50;
    newY = Math.round((event.pointY - this.parent.y - (this.height / 2)) / 25) * 25;
    equals = false;
    for (k = 0, len = layerArray.length; k < len; k++) {
      bubble = layerArray[k];
      if ((bubble.id !== this.id) && (Math.abs(newX - bubble.x) < this.width) && (Math.abs(newY - bubble.y) < this.height)) {
        equals = true;
      }
    }
    if ((newX < 0) || (newY < 0) || (newX > this.parent.width) || (newY > this.parent.height - this.height)) {
      equals = true;
    }
    if (equals) {
      this.x = this.oldX;
      return this.y = this.oldY;
    } else {
      this.x = newX;
      this.y = newY;
      this.oldX = newX;
      return this.oldY = newY;
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
    layerA.draggable.enabled = false;
    this.oldX = this.x;
    return this.oldY = this.y;
  });
  layerArray[i].onDragEnd(function() {
    return layerA.draggable.enabled = true;
  });
  return layerArray[i].onDragMove(function(event) {
    var bubble, equals, k, len, newX, newY;
    newX = Math.round((event.pointX - this.parent.x - (this.width / 2)) / 50) * 50;
    newY = Math.round((event.pointY - this.parent.y - (this.height / 2)) / 25) * 25;
    equals = false;
    for (k = 0, len = layerArray.length; k < len; k++) {
      bubble = layerArray[k];
      if ((bubble.id !== this.id) && (Math.abs(newX - bubble.x) < this.width) && (Math.abs(newY - bubble.y) < this.height)) {
        equals = true;
      }
    }
    if ((newX < 0) || (newY < 0) || (newX > this.parent.width) || (newY > this.parent.height - this.height)) {
      equals = true;
    }
    if (equals) {
      this.x = this.oldX;
      return this.y = this.oldY;
    } else {
      this.x = newX;
      this.y = newY;
      this.oldX = newX;
      return this.oldY = newY;
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
  height: 50
});

inputText.lyric = "Test";

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

music_skipleft = new Layer({
  height: 100,
  width: 100,
  image: "resources/music_skipleft.png"
});

music_skipleft.on(Events.Click, function() {
  minimapSelection.x = 0;
  return layerA.x = 0;
});

music_playpause = new Layer({
  x: 100,
  height: 100,
  width: 100,
  image: "resources/music_playpause.png"
});

playing = false;

music_playpause.on(Events.Click, function() {
  if (playing) {
    minimapSelection.animateStop();
    layerA.animateStop();
  } else {
    minimapSelection.animate({
      properties: {
        x: Screen.width - minimapSelection.width
      },
      curve: "linear",
      time: 10
    });
    layerA.animate({
      properties: {
        x: Screen.width - layerA.width
      },
      curve: "linear",
      time: 10
    });
  }
  return playing = !playing;
});

music_stop = new Layer({
  x: 200,
  height: 100,
  width: 100,
  image: "resources/music_stop.png"
});

music_stop.on(Events.Click, function() {
  playing = false;
  minimapSelection.animateStop();
  return layerA.animateStop();
});

music_skipright = new Layer({
  x: 300,
  height: 100,
  width: 100,
  image: "resources/music_skipright.png"
});

music_skipright.on(Events.Click, function() {
  minimapSelection.x = Screen.width - minimapSelection.width;
  return layerA.x = Screen.width - layerA.width;
});

music_line = new Layer({
  parent: layerA,
  width: 18,
  height: 300,
  image: "resources/music_line.png"
});

program_open = new Layer({
  width: 100,
  height: 100,
  image: "resources/program_open.png"
});

program_open.fluid({
  xAlign: 'right',
  xOffset: -250
});

program_open.on(Events.Click, function() {
  return fileLoader.click();
});

program_save = new Layer({
  width: 100,
  height: 100,
  image: "resources/program_save.png"
});

program_save.fluid({
  xAlign: 'right',
  xOffset: -150
});

program_save.on(Events.Click, function() {
  return fileSaver.click();
});

program_settings = new Layer({
  width: 100,
  height: 100,
  image: "resources/program_settings.png"
});

program_settings.fluid({
  xAlign: 'right',
  xOffset: -45
});

program_settings.on(Events.Click, function() {
  settings.fluid({
    xAlign: 'right',
    xOffset: -10
  });
  return settings.states.next();
});

minimap = new Layer({
  height: 100,
  y: 100
});

minimap.fluid({
  autoWidth: true
});

minimapSelection = new Layer({
  width: 180,
  height: 100,
  image: "resources/Overview.png",
  parent: minimap
});

minimapSelection.draggable.enabled = true;

minimapSelection.draggable.enabled = true;

minimapSelection.draggable.overdrag = false;

minimapSelection.draggable.bounce = false;

minimapSelection.draggable.momentum = false;

minimapSelection.draggable.constraints = {
  width: Screen.width,
  height: minimap.height
};

window.addEventListener('resize', (function(event) {
  return minimapSelection.draggable.constraints = {
    width: minimap.width,
    height: minimap.height
  };
}), false);

settings = new Layer({
  width: 545,
  height: 700,
  x: window.innerWidth,
  y: 100,
  image: "resources/Settings Project.png",
  scale: 0
});

settings.fluid({
  xAlign: 'right',
  xOffset: -10
});

settings.states.add({
  fade: {
    scale: 1
  }
});

settings_programm = new Layer({
  parent: settings,
  width: 222,
  height: 51,
  x: 273,
  y: 80,
  backgroundColor: "#f400ff"
});

Utils.labelLayer(settings_programm, "Programm");

settings_projekt = new Layer({
  parent: settings,
  width: 222,
  height: 51,
  x: 50,
  y: 80,
  backgroundColor: "#1cff00"
});

Utils.labelLayer(settings_projekt, "Projekt");


/*

video = new VideoPlayer
  x: 200
  y: 200
  video: "resources/video.mp4"

video.playButtonImage = "resources/button_play.jpg"
video.pauseButtonImage = "resources/button_stop.png"
video.showProgress = true
 */
