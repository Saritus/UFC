background = new Layer
  image: "resources/blue_background.png"

background.fluid
  autoWidth: true
  autoHeight: true

workspace = new Layer
  parent: background
  width: 3500
  height: 300
  image: "resources/workfield2.png"

workspace.fluid
  yAlign: 'bottom'
  yOffset: -350

workspace.draggable.enabled=true
workspace.draggable.overdrag = false
workspace.draggable.bounce = false
workspace.draggable.momentum = false
workspace.draggable.horizontal = true
workspace.draggable.vertical = false

workspace.draggable.constraints =
    x: Canvas.width - workspace.width
    width: 2 * workspace.width - Canvas.width

layerArray = [workspace]
for i in [1..5]
  layerArray[i] = new Layer
    x: i*100
    y: 50
    width: 100
    height: 50
    image: "resources/clean_long_blue.png"
  layerArray[i].id = layerArray.length
  workspace.addSubLayer(layerArray[i])
  layerArray[i].draggable.enabled=true
  layerArray[i].draggable.overdrag = false
  layerArray[i].draggable.bounce = false
  layerArray[i].draggable.momentum = false
  layerArray[i].draggable.constraints =
      width: workspace.width
      height: workspace.height
  layerArray[i].onDragStart ->
    workspace.draggable.enabled=false
    @oldX = @x
    @oldY = @y
    @image = "resources/clean_long_orange.png"
  layerArray[i].onDragEnd ->
    workspace.draggable.enabled=true
    @image = "resources/clean_long_blue.png"
  layerArray[i].onDragMove (event) ->
    newX = Math.round((event.pointX - @parent.x - (@width / 2)) / 50) * 50
    newY = Math.round((event.pointY - @parent.y - (@height / 2)) / 25) * 25
    equals = false
    for bubble in layerArray
      if (bubble.id isnt @id) and (Math.abs(newX - bubble.x) < @width) and (Math.abs(newY - bubble.y) < @height)
        equals = true
    if (newX < 0) or (newY < 0) or (newX > @parent.width) or (newY > @parent.height - @height)
      equals = true
    if equals
      @x = @oldX
      @y = @oldY
    else
      @x = newX
      @y = newY
      @oldX = newX
      @oldY = newY

newTone = new Layer
  parent: background
  height: 100
  width: 100
  image: "resources/addBubble.png"

newTone.fluid
  xAlign: 'right'
  xOffset: -5
  yAlign: 'bottom'
  yOffset: -205

newTone.on Events.Click, ->
  i = layerArray.length
  layerArray[i] = new Layer
    x: i*100
    y: 50
    width: 100
    height: 50
    image: "resources/clean_long_blue.png"
  workspace.addSubLayer(layerArray[i])
  layerArray[i].draggable.enabled=true
  layerArray[i].draggable.overdrag = false
  layerArray[i].draggable.bounce = false
  layerArray[i].draggable.momentum = false
  layerArray[i].draggable.constraints =
      width: workspace.width
      height: workspace.height
  layerArray[i].onDragStart ->
    workspace.draggable.enabled=false
    @oldX = @x
    @oldY = @y
    @image = "resources/clean_long_orange.png"
  layerArray[i].onDragEnd ->
    workspace.draggable.enabled=true
    @image = "resources/clean_long_blue.png"
  layerArray[i].onDragMove (event) ->
    newX = Math.round((event.pointX - @parent.x - (@width / 2)) / 50) * 50
    newY = Math.round((event.pointY - @parent.y - (@height / 2)) / 25) * 25
    equals = false
    for bubble in layerArray
      if (bubble.id isnt @id) and (Math.abs(newX - bubble.x) < @width) and (Math.abs(newY - bubble.y) < @height)
        equals = true
    if (newX < 0) or (newY < 0) or (newX > @parent.width) or (newY > @parent.height - @height)
      equals = true
    if equals
      @x = @oldX
      @y = @oldY
    else
      @x = newX
      @y = newY
      @oldX = newX
      @oldY = newY

inputFrame = new Layer
  parent: background
  height: 200

inputFrame.fluid
  yAlign: 'bottom'
  autoWidth: true


inputText = new Input
    setup: true # Change to true when positioning the input so you can see it
    placeholder: "Text"
    placeholderColor: "#fff"
    type: "text"
    width: window.innerWidth / 2 - 35
    height: 50
inputText.lyric = "Test"

inputText.fluid
  xOffset: 10
  yOffset: -110
  xAlign: 'left'
  yAlign: 'bottom'

inputStart = new Input
    setup: true # Change to true when positioning the input so you can see it
    placeholder: "Start"
    placeholderColor: "#fff"
    type: "number"
    width: window.innerWidth / 2 - 35
    height: 50
    parent: inputFrame

inputStart.fluid
  xOffset: 10
  yOffset: -30
  xAlign: 'left'
  yAlign: 'bottom'

inputLength = new Input
    setup: true # Change to true when positioning the input so you can see it
    placeholder: "Länge"
    placeholderColor: "#fff"
    type: "number"
    width: window.innerWidth / 2 - 35
    height: 50
    parent: inputFrame

inputLength.fluid
  xOffset: -30
  yOffset: -110
  xAlign: 'right'
  yAlign: 'bottom'

inputPitch = new Input
    setup: true # Change to true when positioning the input so you can see it
    placeholder: "Tonhöhe"
    placeholderColor: "#fff"
    type: "number"
    width: window.innerWidth / 2 - 35
    height: 50
    parent: inputFrame

inputPitch.fluid
  xOffset: -30
  yOffset: -30
  xAlign: 'right'
  yAlign: 'bottom'

music_skipleft = new Layer
  height: 100
  width: 100
  image: "blues/button_blue_first.png"

music_skipleft.on Events.Click, ->
  minimapSelection.x = 0
  workspace.x = 0

music_playpause = new Layer
  x: 100
  height: 100
  width: 100
  image: "blues/button_blue_play.png"

playing = false

music_playpause.on Events.Click, ->
  if playing
    minimapSelection.animateStop()
    workspace.animateStop()
    music_playpause.image = "blues/button_blue_play.png"
  else
    minimapSelection.animate
      properties:
          x: background.width - minimapSelection.width
      curve: "linear"
      time: 10 * ((minimap.width - minimapSelection.width - minimapSelection.x) / (minimap.width - minimapSelection.width))
    workspace.animate
      properties:
          x: background.width - workspace.width
      curve: "linear"
      time: 10 * ((minimap.width - minimapSelection.width - minimapSelection.x) / (minimap.width - minimapSelection.width))
    music_playpause.image = "blues/button_blue_pause.png"

  playing = !playing

music_stop = new Layer
  x: 200
  height: 100
  width: 100
  image: "blues/button_blue_stop.png"

music_stop.on Events.Click, ->
  playing = false
  minimapSelection.animateStop()
  workspace.animateStop()

music_skipright = new Layer
  x: 300
  height: 100
  width: 100
  image: "blues/button_blue_last.png"

music_skipright.on Events.Click, ->
  minimapSelection.x = background.width - minimapSelection.width
  workspace.x = background.width - workspace.width

music_line = new Layer
  width: 18
  height: 300
  image: "resources/music_line_2.png"

music_line.fluid
    yAlign: 'bottom'
    yOffset: -350

music_line.draggable.enabled = true
music_line.draggable.enabled=true
music_line.draggable.overdrag = false
music_line.draggable.bounce = false
music_line.draggable.momentum = false
music_line.draggable.constraints = {
  x: 0
  y: Screen.height - 350 - workspace.height
  width: Screen.width
  height: workspace.height
}


program_open = new Layer
  parent: background
  width: 100
  height: 100
  image: "blues/folder_open.png"
program_open.fluid
  xAlign: 'right'
  xOffset: -215

program_open.on Events.Click, ->
  fileLoader.click()

program_save = new Layer
  parent: background
  width: 100
  height: 100
  image: "blues/save.png"
program_save.fluid
  xAlign: 'right'
  xOffset: -105

program_save.on Events.Click, ->
  fileSaver.click()

program_settings = new Layer
  parent: background
  width: 100
  height: 100
  image: "blues/gear_blue.png"
program_settings.fluid
  xAlign: 'right'
  xOffset: -5

settingsshow = false
program_settings.on Events.Click, ->
  if settingsshow
    #Settings ausblenden
    settings.animate
      properties:
        x: Screen.width
      time: 1
    background.fluid
      autoWidth: true
      autoHeight: true
      widthOffset: 0
    #settings.opacity = 0
    settings.fluid
      autoHeight: true
      xAlign: 'right'
      xOffset: 400
  else
    #Settings einblenden
    settings.animate
      properties:
        x: Screen.width - 400
      time: 1
    background.fluid
      autoWidth: true
      autoHeight: true
      widthOffset: -400
    #settings.opacity = 1
    settings.fluid
      autoHeight: true
      xAlign: 'right'
      xOffset: 0
  newTone.fluid
    xAlign: 'right'
    xOffset: -5
    yAlign: 'bottom'
    yOffset: -205
  minimap.fluid
    autoWidth: true
  inputFrame.fluid
    yAlign: 'bottom'
    autoWidth: true
  program_open.fluid
    xAlign: 'right'
    xOffset: -215
  program_save.fluid
    xAlign: 'right'
    xOffset: -105
  program_settings.fluid
    xAlign: 'right'
    xOffset: -5
  minimapSelection.draggable.constraints =
    width: minimap.width
    height: minimap.height

  inputText.width = inputFrame.width / 2 - 35
  inputPitch.width = inputFrame.width / 2 - 35
  inputStart.width = inputFrame.width / 2 - 35
  inputLength.width = inputFrame.width / 2 - 35
  settingsshow = not settingsshow

minimap = new Layer
  parent: background
  height: 100
  y: 100
  backgroundColor: 'rgb(210, 210, 210)'

minimap.fluid
  autoWidth: true

minimapSelection = new Layer
  parent: minimap
  width: 185
  height: 100
  image: "blues/minimap_border.png"

minimapSelection.draggable.enabled = true
minimapSelection.draggable.enabled=true
minimapSelection.draggable.overdrag = false
minimapSelection.draggable.bounce = false
minimapSelection.draggable.momentum = false
minimapSelection.draggable.constraints =
  width: Screen.width
  height: minimap.height

minimapSelection.on Events.AnimationEnd, ->
  music_playpause.image = "blues/button_blue_play.png"

# SETTINGS


settings = new Layer
  width: 400
  #image: "resources/Sidebar.png"
  backgroundColor: "rgb(41, 66, 143)"
  opacity: 1

settings.fluid
  autoHeight: true
  xAlign: 'right'
  xOffset: 400



settings_programm = new Layer
  parent: settings
  width: 200
  height: 70
  x: 0
  y: 0
  backgroundColor: "rgba(255, 255, 255, 0.2)"
  html: '<center><h2>Programm</h2></center>'

settings_projekt = new Layer
  parent: settings
  width: 200
  height: 70
  x: 200
  y: 0
  backgroundColor: "rgba(0, 0, 0, 0.2)"
  html: '<center><h2>Projekt</h2></center>'

# VIDEOANSICHT

video_window = new Layer
  x: 0
  y: 0
  backgroundColor: 'black'

video_window.fluid
  widthOffset: 0
  heightOffset: 0
  autoWidth: true
  autoHeight: true

video_close = new Layer
  parent: video_window
  image: "resources/closeButton_red.png"
  width: 50
  height: 50

video_close.fluid
  xAlign: 'right'
  yAlign: 'top'

video = new VideoPlayer
  parent: video_window
  width: Screen.width/2
  height: Screen.height/2
  x: Screen.width/4
  y: Screen.height/4
  video: "resources/video.mp4"

video.parent = video_window
video.playButtonImage = "resources/play.png"
video.shyPlayButton = true

### progressBar bringt VideoPlayer zum laggen
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
###

video_close.on Events.Click, ->
  video.player.pause()
  video_window.visible = false
  video.visible = false
  video_close.visible = false

window.addEventListener 'resize', ((event) ->
  minimapSelection.draggable.constraints =
    width: minimap.width
    height: minimap.height
  video.centerX()
), false
