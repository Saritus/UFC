var background, i, inputFrame, inputLength, inputPitch, inputStart, inputText, j, layerArray, minimap, minimapSelection, music_line, music_playpause, music_skipleft, music_skipright, music_stop, newTone, playing, program_open, program_save, program_settings, settings, settings_programm, settings_programm_farbe, settings_programm_font, settings_programm_sprache, settings_projekt, settings_projekt_bpm, settings_projekt_cover_input, settings_projekt_cover_open, settings_projekt_interpret, settings_projekt_titel, settings_projekt_video_input, settings_projekt_video_open, settings_projekt_video_start, settingsshow, video, video_close, video_window, workspace;

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

workspace.onDragMove(function() {
  return minimapSelection.x = (workspace.x / (Canvas.width - workspace.width)) * (minimap.width - minimapSelection.width);
});

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
    var bubblenr, k, ref;
    workspace.draggable.enabled = false;
    this.oldX = this.x;
    this.oldY = this.y;
    for (bubblenr = k = 1, ref = layerArray.length - 1; 1 <= ref ? k <= ref : k >= ref; bubblenr = 1 <= ref ? ++k : --k) {
      layerArray[bubblenr].image = "resources/clean_long_blue.png";
    }
    return this.image = "resources/clean_long_orange.png";
  });
  layerArray[i].onDragEnd(function() {
    return workspace.draggable.enabled = true;
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
  layerArray[i].on(Events.Click, function() {
    var bubblenr, k, ref;
    for (bubblenr = k = 1, ref = layerArray.length - 1; 1 <= ref ? k <= ref : k >= ref; bubblenr = 1 <= ref ? ++k : --k) {
      layerArray[bubblenr].image = "resources/clean_long_blue.png";
    }
    return this.image = "resources/clean_long_orange.png";
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
        x: background.width - minimapSelection.width
      },
      curve: "linear",
      time: 10 * ((minimap.width - minimapSelection.width - minimapSelection.x) / (minimap.width - minimapSelection.width))
    });
    workspace.animate({
      properties: {
        x: background.width - workspace.width
      },
      curve: "linear",
      time: 10 * ((minimap.width - minimapSelection.width - minimapSelection.x) / (minimap.width - minimapSelection.width))
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
  workspace.animateStop();
  music_playpause.image = "blues/button_blue_play.png";
  minimapSelection.x = 0;
  return workspace.x = 0;
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

music_line.draggable.enabled = true;

music_line.draggable.enabled = true;

music_line.draggable.overdrag = false;

music_line.draggable.bounce = false;

music_line.draggable.momentum = false;

music_line.draggable.constraints = {
  x: 0,
  y: Screen.height - 350 - workspace.height,
  width: Screen.width,
  height: workspace.height
};

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
    background.x = -400;
    background.fluid({
      autoWidth: true,
      autoHeight: true,
      xOffset: -400
    });
    background["static"]();
    background.animate({
      properties: {
        x: 0
      },
      time: 1
    });
    settings.fluid({
      autoHeight: true,
      xAlign: 'right',
      xOffset: 400
    });
  } else {
    settings.animate({
      properties: {
        x: Screen.width - 400
      },
      time: 1
    });
    background["static"]();
    background.animate({
      properties: {
        x: -400
      },
      time: 1
    });
    settings.fluid({
      autoHeight: true,
      xAlign: 'right',
      xOffset: 0
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
  minimapSelection.draggable.constraints = {
    width: minimap.width,
    height: minimap.height
  };
  inputText.width = inputFrame.width / 2 - 35;
  inputPitch.width = inputFrame.width / 2 - 35;
  inputStart.width = inputFrame.width / 2 - 35;
  inputLength.width = inputFrame.width / 2 - 35;
  return settingsshow = !settingsshow;
});

background.onAnimationEnd(function() {
  background.x = 0;
  if (settingsshow) {
    background.fluid({
      autoWidth: true,
      autoHeight: true,
      widthOffset: -400
    });
  } else {
    background.fluid({
      autoWidth: true,
      autoHeight: true,
      widthOffset: 0
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
  minimapSelection.draggable.constraints = {
    width: minimap.width,
    height: minimap.height
  };
  inputText.width = inputFrame.width / 2 - 35;
  inputPitch.width = inputFrame.width / 2 - 35;
  inputStart.width = inputFrame.width / 2 - 35;
  return inputLength.width = inputFrame.width / 2 - 35;
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
  parent: minimap,
  width: 185,
  height: 100,
  image: "blues/minimap_border.png"
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

minimapSelection.onDragMove(function() {
  return workspace.x = (Canvas.width - workspace.width) * (minimapSelection.x / (minimap.width - minimapSelection.width));
});

minimapSelection.on(Events.AnimationEnd, function() {
  return music_playpause.image = "blues/button_blue_play.png";
});

settings = new Layer({
  width: 400,
  backgroundColor: "rgb(11, 56, 95)",
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
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  html: '<center><h2>Programm</h2></center>'
});

settings_programm.on(Events.Click, function() {
  settings_programm.backgroundColor = "rgba(255, 255, 255, 0.2)";
  settings_projekt.backgroundColor = "rgba(0, 0, 0, 0)";
  settings_programm_sprache.visible = true;
  settings_programm_font.visible = true;
  settings_programm_farbe.visible = true;
  settings_projekt_titel.visible = false;
  settings_projekt_interpret.visible = false;
  settings_projekt_bpm.visible = false;
  settings_projekt_video_input.visible = false;
  settings_projekt_video_start.visible = false;
  settings_projekt_video_open.visible = false;
  settings_projekt_cover_input.visible = false;
  return settings_projekt_cover_open.visible = false;
});

settings_programm_sprache = new Input({
  parent: settings,
  setup: true,
  placeholder: "Sprache",
  placeholderColor: "#fff",
  type: "text",
  x: 0,
  y: 100,
  width: 380,
  height: 50
});

settings_programm_font = new Input({
  parent: settings,
  setup: true,
  placeholder: "Font",
  placeholderColor: "#fff",
  type: "text",
  x: 0,
  y: 200,
  width: 380,
  height: 50
});

settings_programm_farbe = new Input({
  parent: settings,
  setup: true,
  placeholder: "Farbe",
  placeholderColor: "#fff",
  type: "text",
  x: 0,
  y: 300,
  width: 380,
  height: 50
});

settings_projekt = new Layer({
  parent: settings,
  width: 200,
  height: 70,
  x: 200,
  y: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  html: '<center><h2>Projekt</h2></center>'
});

settings_projekt.on(Events.Click, function() {
  settings_programm.backgroundColor = "rgba(0, 0, 0, 0)";
  settings_projekt.backgroundColor = "rgba(255, 255, 255, 0.2)";
  settings_programm_sprache.visible = false;
  settings_programm_font.visible = false;
  settings_programm_farbe.visible = false;
  settings_projekt_titel.visible = true;
  settings_projekt_interpret.visible = true;
  settings_projekt_bpm.visible = true;
  settings_projekt_video_input.visible = true;
  settings_projekt_video_start.visible = true;
  settings_projekt_video_open.visible = true;
  settings_projekt_cover_input.visible = true;
  return settings_projekt_cover_open.visible = true;
});

settings_projekt_titel = new Input({
  parent: settings,
  setup: true,
  placeholder: "Titel",
  placeholderColor: "#fff",
  type: "text",
  x: 0,
  y: 100,
  width: 380,
  height: 50
});

settings_projekt_interpret = new Input({
  parent: settings,
  setup: true,
  placeholder: "Interpret",
  placeholderColor: "#fff",
  type: "text",
  x: 0,
  y: 200,
  width: 380,
  height: 50
});

settings_projekt_bpm = new Input({
  parent: settings,
  setup: true,
  placeholder: "BPM",
  placeholderColor: "#fff",
  type: "number",
  x: 0,
  y: 300,
  width: 380,
  height: 50
});

settings_projekt_video_input = new Input({
  parent: settings,
  setup: true,
  placeholder: "Video",
  placeholderColor: "#fff",
  type: "text",
  x: 70,
  y: 400,
  width: 230,
  height: 50
});

settings_projekt_video_open = new Layer({
  parent: settings,
  x: 330,
  y: 400,
  width: 70,
  height: 70,
  image: "blues/folder_open.png"
});

settings_projekt_video_start = new Layer({
  parent: settings,
  x: 0,
  y: 400,
  width: 70,
  height: 70,
  image: "blues/button_blue_play.png"
});

settings_projekt_video_start.on(Events.Click, function() {
  video.video = "resources/" + settings_projekt_video_input.value + ".mp4";
  video_window.visible = true;
  video.visible = true;
  return video_close.visible = true;
});

settings_projekt_cover_input = new Input({
  parent: settings,
  setup: true,
  placeholder: "Cover",
  placeholderColor: "#fff",
  type: "text",
  x: 0,
  y: 500,
  width: 300,
  height: 50
});

settings_projekt_cover_open = new Layer({
  parent: settings,
  x: 330,
  y: 500,
  width: 70,
  height: 70,
  image: "blues/folder_open.png"
});

settings_programm_sprache.visible = true;

settings_programm_font.visible = true;

settings_programm_farbe.visible = true;

settings_projekt_titel.visible = false;

settings_projekt_interpret.visible = false;

settings_projekt_bpm.visible = false;

settings_projekt_video_input.visible = false;

settings_projekt_video_start.visible = false;

settings_projekt_video_open.visible = false;

settings_projekt_cover_input.visible = false;

settings_projekt_cover_open.visible = false;

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
  y: Screen.height / 4
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

video_window.visible = false;

video.visible = false;

video_close.visible = false;

window.addEventListener('resize', (function(event) {
  minimapSelection.draggable.constraints = {
    width: minimap.width,
    height: minimap.height
  };
  return video.centerX();
}), false);
