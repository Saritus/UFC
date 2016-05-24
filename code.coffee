#InputModule = require "input"


layerA = new Layer
  width: 3500
  height: 300
  #image: "resources/workfield.png"

layerA.centerY()
#layerA.fluid
#  autoHeight: true

layerInput = new Layer
  html: "<input id='vname' name='vname'>"

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
      @x = Math.round((event.pointX - layerA.x - (@width / 2)) / 100) * 100
    if @y %% 25 isnt 0
      @y = Math.round((event.pointY - layerA.y - (@height / 2)) / 25) * 25

targetLayer = new Layer
    x: 20
    y: 20
Utils.labelLayer(targetLayer, "targetLayer")

startButton = new Layer
  x: 20
  y: 700
  height: 50
  backgroundColor: "#ff7606"
Utils.labelLayer startButton, "Start"
reverseButton = startButton.copy()
reverseButton.x = 260
Utils.labelLayer reverseButton, "Reverse"
stopButton = startButton.copy()
stopButton.x = 500
Utils.labelLayer stopButton, "Stop"


animation = new Animation
  layer: targetLayer
  properties:
    x: 450
  curve: "ease-in-out"
  time: 1

reverseAnimation = animation.reverse()

startButton.on Events.Click, ->
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
      @x = Math.round((event.pointX - layerA.x - (@width / 2)) / 100) * 100
    if @y %% 25 isnt 0
      @y = Math.round((event.pointY - layerA.y - (@height / 2)) / 25) * 25

stopButton.on Events.Click, ->
  targetLayer.animateStop()

reverseButton.on Events.Click, ->
  reverseAnimation.start()




###

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
###
