class Tone extends Layer

  constructor: (options={}) ->

    # instance vars for layers we will create
    @Layer = null

    # internal instance vars we may create
    @_currentlyPlaying = null
    @_shyPlayButton = null
    @_shyControls = null
    @_isScrubbing = null
    @_showProgress = null
    @_showTimeElapsed = null
    @_showTimeLeft = null
    @_showTimeTotal = null
    @_controlsArray = []

    options.backgroundColor ?= "#000"
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
