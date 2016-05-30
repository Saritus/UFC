#InputModule = require "input"


layerA = new Layer
  width: 3500
  height: 300
  #image: "resources/workfield.png"

layerA.centerY()
#layerA.fluid
#  autoHeight: true

#layerInput = new Layer
#  html: "<input id='vname' name='vname'>"

layerA.draggable.enabled=true

layerA.draggable.overdrag = false
layerA.draggable.bounce = false
layerA.draggable.momentum = false
layerA.draggable.horizontal = true
layerA.draggable.vertical = false

layerA.draggable.constraints =
    x: Canvas.width - layerA.width
    width: 2 * layerA.width - Canvas.width


layerArray = [layerA]
for i in [1..5]
  layerArray[i] = new Layer
    x: i*100
    y: 50
    width: 100
    height: 50
    image: "resources/Block1.png"
  layerA.addSubLayer(layerArray[i])
  layerArray[i].draggable.enabled=true
  layerArray[i].draggable.overdrag = false
  layerArray[i].draggable.bounce = false
  layerArray[i].draggable.momentum = false
  layerArray[i].draggable.constraints =
      width: layerA.width
      height: layerA.height
  layerArray[i].onDragStart ->
    layerA.draggable.enabled=false
  layerArray[i].onDragEnd ->
    layerA.draggable.enabled=true
  layerArray[i].onDragMove (event) ->
    if @x %% 100 isnt 0
      @x = Math.round((event.pointX - @parent.x - (@width / 2)) / 100) * 100
    if @y %% 25 isnt 0
      @y = Math.round((event.pointY - @parent.y - (@height / 2)) / 25) * 25

newTone = new Layer
  height: 100
  width: 100
  image: "resources/addTone.png"

newTone.fluid
  xAlign: 'right'
  xOffset: -5
  yAlign: 'bottom'
  yOffset: -5

###
animation = new Animation
  layer: targetLayer
  properties:
    x: 450
  curve: "ease-in-out"
  time: 1

reverseAnimation = animation.reverse()
###

newTone.on Events.Click, ->
  i=layerArray.length
  layerArray[i] = new Layer
    x: i*100
    y: 50
    width: 100
    height: 50
    image: "resources/Block1.png"
  layerA.addSubLayer(layerArray[i])
  layerArray[i].draggable.enabled=true
  layerArray[i].draggable.overdrag = false
  layerArray[i].draggable.bounce = false
  layerArray[i].draggable.momentum = false
  layerArray[i].draggable.constraints =
      width: layerA.width
      height: layerA.height
  layerArray[i].onDragStart ->
    layerA.draggable.enabled=false
  layerArray[i].onDragEnd ->
    layerA.draggable.enabled=true
  layerArray[i].onDragMove (event) ->
    if @x %% 100 isnt 0
      @x = Math.round((event.pointX - @parent.x - (@width / 2)) / 100) * 100
    if @y %% 25 isnt 0
      @y = Math.round((event.pointY - @parent.y - (@height / 2)) / 25) * 25



inputText = new Input
    setup: true # Change to true when positioning the input so you can see it
    virtualKeyboard: false # Enable or disable virtual keyboard for when viewing on computer
    placeholder: "Text"
    placeholderColor: "#fff"
    type: "text"
    width: Screen.width / 2
    height: 50

inputText.fluid
  xOffset: 5
  yOffset: -105
  autoWidth: true
  xAlign: 'left'
  yAlign: 'bottom'

inputStart = new Input
    setup: true # Change to true when positioning the input so you can see it
    virtualKeyboard: false # Enable or disable virtual keyboard for when viewing on computer
    placeholder: "Start"
    placeholderColor: "#fff"
    type: "number"#color
    width: Screen.width / 2
    height: 50

inputStart.fluid
  xOffset: 5
  yOffset: -25
  autoWidth: true
  xAlign: 'left'
  yAlign: 'bottom'

###
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
###


###

video = new VideoPlayer
  x: 200
  y: 200
  video: "resources/video.mp4"

video.playButtonImage = "resources/button_play.jpg"
video.pauseButtonImage = "resources/button_stop.png"
video.showProgress = true

###

music_skipleft = new Layer
  height: 100
  width: 100
  image: "resources/music_skipleft.png"

music_playpause = new Layer
  x: 100
  height: 100
  width: 100
  image: "resources/music_skipleft.png"

music_stop = new Layer
  x: 200
  height: 100
  width: 100
  image: "resources/music_skipleft.png"

music_skipright = new Layer
  x: 300
  height: 100
  width: 100
  image: "resources/music_skipleft.png"

###
programControl = new Layer
  height: 100
  width: 450
  image: "resources/TopBar Right.png"
programControl.fluid
  xAlign: 'right'
###

program_open = new Layer
  width: 100
  height: 100
  image: "resources/program_open.png"
program_open.fluid
  xAlign: 'right'
  xOffset: -200

program_open.on Events.Click, ->
  filereader = new FileReader

program_save = new Layer
  width: 100
  height: 100
  image: "resources/program_open.png"
program_save.fluid
  xAlign: 'right'
  xOffset: -100

program_settings = new Layer
  width: 100
  height: 100
  image: "resources/program_settings.png"
program_settings.fluid
  xAlign: 'right'
  xOffset: 0

minimap = new Layer
  height: 100
  y: 100

minimap.fluid
  autoWidth: true

window.addEventListener 'resize', ((event) ->
  inputText.width = Screen.width / 2
), false
