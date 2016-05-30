class Tone extends Layer

  constructor: (options={}) ->

    # instance vars for layers we will create
    @Layer = null

    # internal instance vars we may create
    @text = ""
    @start = 0
    @length = 1
    @pitch = 0

    options.backgroundColor ?= "rgb(0, 0, 0)"
    options.width ?= 480
    options.height ?= 270
    if options.fullscreen
      options.width = Screen.width
      options.height = Screen.height

      # here's our container layer
    super
      width: options.width
      height: options.height
      x: options.x
      y: options.y
      backgroundColor: null
