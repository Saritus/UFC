var background, i, inputFrame, inputLength, inputPitch, inputStart, inputText, j, layerArray, minimap, minimapSelection, music_line, music_playpause, music_skipleft, music_skipright, music_stop, newTone, playing, program_open, program_save, program_settings, settings, settings_programm, settings_projekt, settingsshow, video, video_close, video_window, workspace;

background = new Layer({
  image: "resources/blue_background.png"
});

background.fluid({
  autoWidth: true,
  autoHeight: true
});

workspace = new Layer({
  parent: background,
  width: 3500,
  height: 300,
  image: "resources/workfield2.png"
});

workspace.fluid({
  yAlign: 'bottom',
  yOffset: -350
});

workspace.draggable.enabled = true;

workspace.draggable.overdrag = false;

workspace.draggable.bounce = false;

workspace.draggable.momentum = false;

workspace.draggable.horizontal = true;

workspace.draggable.vertical = false;

workspace.draggable.constraints = {
  x: Canvas.width - workspace.width,
  width: 2 * workspace.width - Canvas.width
};

layerArray = [workspace];

for (i = j = 1; j <= 5; i = ++j) {
  layerArray[i] = new Layer({
    x: i * 100,
    y: 50,
    width: 100,
    height: 50,
    image: "resources/clean_long_blue.png"
  });
  layerArray[i].id = layerArray.length;
  workspace.addSubLayer(layerArray[i]);
  layerArray[i].draggable.enabled = true;
  layerArray[i].draggable.overdrag = false;
  layerArray[i].draggable.bounce = false;
  layerArray[i].draggable.momentum = false;
  layerArray[i].draggable.constraints = {
    width: workspace.width,
    height: workspace.height
  };
  layerArray[i].onDragStart(function() {
    workspace.draggable.enabled = false;
    this.oldX = this.x;
    this.oldY = this.y;
    return this.image = "resources/clean_long_orange.png";
  });
  layerArray[i].onDragEnd(function() {
    workspace.draggable.enabled = true;
    return this.image = "resources/clean_long_blue.png";
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
  parent: background,
  height: 100,
  width: 100,
  image: "resources/addBubble.png"
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
    image: "resources/clean_long_blue.png"
  });
  workspace.addSubLayer(layerArray[i]);
  layerArray[i].draggable.enabled = true;
  layerArray[i].draggable.overdrag = false;
  layerArray[i].draggable.bounce = false;
  layerArray[i].draggable.momentum = false;
  layerArray[i].draggable.constraints = {
    width: workspace.width,
    height: workspace.height
  };
  layerArray[i].onDragStart(function() {
    workspace.draggable.enabled = false;
    this.oldX = this.x;
    this.oldY = this.y;
    return this.image = "resources/clean_long_orange.png";
  });
  layerArray[i].onDragEnd(function() {
    workspace.draggable.enabled = true;
    return this.image = "resources/clean_long_blue.png";
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
  parent: background,
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
  image: "blues/button_blue_first.png"
});

music_skipleft.on(Events.Click, function() {
  minimapSelection.x = 0;
  return workspace.x = 0;
});

music_playpause = new Layer({
  x: 100,
  height: 100,
  width: 100,
  image: "blues/button_blue_play.png"
});

playing = false;

music_playpause.on(Events.Click, function() {
  if (playing) {
    minimapSelection.animateStop();
    workspace.animateStop();
    music_playpause.image = "blues/button_blue_play.png";
  } else {
    minimapSelection.animate({
      properties: {
        x: Screen.width - minimapSelection.width
      },
      curve: "linear",
      time: 10
    });
    workspace.animate({
      properties: {
        x: Screen.width - workspace.width
      },
      curve: "linear",
      time: 10
    });
    music_playpause.image = "blues/button_blue_pause.png";
  }
  return playing = !playing;
});

music_stop = new Layer({
  x: 200,
  height: 100,
  width: 100,
  image: "blues/button_blue_stop.png"
});

music_stop.on(Events.Click, function() {
  playing = false;
  minimapSelection.animateStop();
  return workspace.animateStop();
});

music_skipright = new Layer({
  x: 300,
  height: 100,
  width: 100,
  image: "blues/button_blue_last.png"
});

music_skipright.on(Events.Click, function() {
  minimapSelection.x = background.width - minimapSelection.width;
  return workspace.x = background.width - workspace.width;
});

music_line = new Layer({
  width: 18,
  height: 300,
  image: "resources/music_line_2.png"
});

music_line.fluid({
  yAlign: 'bottom',
  yOffset: -350
});

program_open = new Layer({
  parent: background,
  width: 100,
  height: 100,
  image: "blues/folder_open.png"
});

program_open.fluid({
  xAlign: 'right',
  xOffset: -215
});

program_open.on(Events.Click, function() {
  return fileLoader.click();
});

program_save = new Layer({
  parent: background,
  width: 100,
  height: 100,
  image: "blues/save.png"
});

program_save.fluid({
  xAlign: 'right',
  xOffset: -105
});

program_save.on(Events.Click, function() {
  return fileSaver.click();
});

program_settings = new Layer({
  parent: background,
  width: 100,
  height: 100,
  image: "blues/gear_blue.png"
});

program_settings.fluid({
  xAlign: 'right',
  xOffset: -5
});

settingsshow = false;

program_settings.on(Events.Click, function() {
  if (settingsshow) {
    settings.animate({
      properties: {
        x: Screen.width
      },
      time: 1
    });
    background.fluid({
      autoWidth: true,
      autoHeight: true,
      widthOffset: 0
    });
  } else {
    settings.animate({
      properties: {
        x: Screen.width - 400
      },
      time: 1
    });
    background.fluid({
      autoWidth: true,
      autoHeight: true,
      widthOffset: -400
    });
  }
  newTone.fluid({
    xAlign: 'right',
    xOffset: -5,
    yAlign: 'bottom',
    yOffset: -205
  });
  minimap.fluid({
    autoWidth: true
  });
  inputFrame.fluid({
    yAlign: 'bottom',
    autoWidth: true
  });
  program_open.fluid({
    xAlign: 'right',
    xOffset: -215
  });
  program_save.fluid({
    xAlign: 'right',
    xOffset: -105
  });
  program_settings.fluid({
    xAlign: 'right',
    xOffset: -5
  });
  inputText.width = inputFrame.width / 2 - 35;
  inputPitch.width = inputFrame.width / 2 - 35;
  inputStart.width = inputFrame.width / 2 - 35;
  inputLength.width = inputFrame.width / 2 - 35;
  return settingsshow = !settingsshow;
});

minimap = new Layer({
  parent: background,
  height: 100,
  y: 100,
  backgroundColor: 'rgb(210, 210, 210)'
});

minimap.fluid({
  autoWidth: true
});

minimapSelection = new Layer({
  width: 93,
  height: 100,
  image: "blues/minimap_border.png",
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

settings = new Layer({
  width: 400,
  backgroundColor: "rgb(41, 66, 143)",
  opacity: 1
});

settings.fluid({
  autoHeight: true,
  xAlign: 'right',
  xOffset: 400
});

settings_programm = new Layer({
  parent: settings,
  width: 200,
  height: 70,
  x: 0,
  y: 0,
  backgroundColor: "#f400ff",
  html: '<center><h2>Programm</h2></center>'
});

settings_projekt = new Layer({
  parent: settings,
  width: 200,
  height: 70,
  x: 200,
  y: 0,
  backgroundColor: "#1cff00",
  html: '<center><h2>Projekt</h2></center>'
});

video_window = new Layer({
  x: 0,
  y: 0,
  backgroundColor: 'black'
});

video_window.fluid({
  widthOffset: 0,
  heightOffset: 0,
  autoWidth: true,
  autoHeight: true
});

video_close = new Layer({
  parent: video_window,
  image: "resources/closeButton_red.png",
  width: 50,
  height: 50
});

video_close.fluid({
  xAlign: 'right',
  yAlign: 'top'
});

video = new VideoPlayer({
  parent: video_window,
  width: Screen.width / 2,
  height: Screen.height / 2,
  x: Screen.width / 4,
  y: Screen.height / 4,
  video: "resources/video.mp4"
});

video.parent = video_window;

video.playButtonImage = "resources/play.png";

video.shyPlayButton = true;


/* progressBar bringt VideoPlayer zum laggen
video.showProgress = true
video.progressBar.width = video.width
video.progressBar.height = 10
video.progressBar.y = video.y + video.height + video.parent.y
video.progressBar.x = video.x + video.parent.x
video.progressBar.knobSize = 22
video.progressBar.borderRadius = 0
video.progressBar.knob.shadowColor = null
video.progressBar.backgroundColor = "#eee"
video.progressBar.fill.backgroundColor = "#333"

video.on "video:play", ->
  video.progressBar.enabled = false
video.on "video:pause", ->
  video.progressBar.enabled = true
 */

video_close.on(Events.Click, function() {
  video.player.pause();
  video_window.visible = false;
  video.visible = false;
  return video_close.visible = false;
});

window.addEventListener('resize', (function(event) {
  minimapSelection.draggable.constraints = {
    width: minimap.width,
    height: minimap.height
  };
  return video.centerX();
}), false);
