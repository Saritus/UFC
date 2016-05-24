var VideoPlayer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VideoPlayer = (function(superClass) {
  extend(VideoPlayer, superClass);

  function VideoPlayer(options) {
    var bindTo;
    if (options == null) {
      options = {};
    }
    this.setPauseButtonImage = bind(this.setPauseButtonImage, this);
    this.setPlayButtonImage = bind(this.setPlayButtonImage, this);
    this.setTimeTotal = bind(this.setTimeTotal, this);
    this.setTimeLeft = bind(this.setTimeLeft, this);
    this.videoLayer = null;
    this.playButton = null;
    this.progessBar = null;
    this.timeElapsed = null;
    this.timeLeft = null;
    this.timeTotal = null;
    this._currentlyPlaying = null;
    this._shyPlayButton = null;
    this._shyControls = null;
    this._isScrubbing = null;
    this._showProgress = null;
    this._showTimeElapsed = null;
    this._showTimeLeft = null;
    this._showTimeTotal = null;
    this._controlsArray = [];
    this.playimage = "images/play.png";
    this.pauseimage = "images/pause.png";
    if (options.playButtonDimensions == null) {
      options.playButtonDimensions = 80;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "#000";
    }
    if (options.width == null) {
      options.width = 480;
    }
    if (options.height == null) {
      options.height = 270;
    }
    if (options.fullscreen) {
      options.width = Screen.width;
      options.height = Screen.height;
    }
    VideoPlayer.__super__.constructor.call(this, {
      width: options.width,
      height: options.height,
      x: options.x,
      y: options.y,
      backgroundColor: null
    });
    this.videoLayer = new VideoLayer({
      width: options.width,
      height: options.height,
      superLayer: this,
      backgroundColor: options.backgroundColor,
      name: "videoLayer"
    });
    if (options.autoplay) {
      this.videoLayer.player.autoplay = true;
    }
    if (options.muted) {
      this.videoLayer.player.muted = true;
    }
    this.playButton = new Layer({
      width: options.playButtonDimensions,
      height: options.playButtonDimensions,
      superLayer: this.videoLayer,
      backgroundColor: null,
      name: "playButton"
    });
    this.playButton.showPlay = (function(_this) {
      return function() {
        return _this.playButton.image = _this.playimage;
      };
    })(this);
    this.playButton.showPause = (function(_this) {
      return function() {
        return _this.playButton.image = _this.pauseimage;
      };
    })(this);
    this.playButton.showPlay();
    this.playButton.center();
    bindTo = options.constrainToButton ? this.playButton : this.videoLayer;
    bindTo.on(Events.Click, (function(_this) {
      return function() {
        var i, layer, len, ref, results;
        if (_this.videoLayer.player.paused) {
          _this.emit("controls:play");
          _this._currentlyPlaying = true;
          _this.videoLayer.player.play();
          if (_this._shyPlayButton) {
            _this.fadePlayButton();
          }
          if (_this._shyControls) {
            return _this.fadeControls();
          }
        } else {
          _this.emit("controls:pause");
          _this._currentlyPlaying = false;
          _this.videoLayer.player.pause();
          _this.playButton.animateStop();
          _this.playButton.opacity = 1;
          ref = _this._controlsArray;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            layer = ref[i];
            layer.animateStop();
            results.push(layer.opacity = 1);
          }
          return results;
        }
      };
    })(this));
    Events.wrap(this.videoLayer.player).on("pause", (function(_this) {
      return function() {
        _this.emit("video:pause");
        if (!_this._isScrubbing) {
          return _this.playButton.showPlay();
        }
      };
    })(this));
    Events.wrap(this.videoLayer.player).on("play", (function(_this) {
      return function() {
        _this.emit("video:play");
        return _this.playButton.showPause();
      };
    })(this));
    Events.wrap(this.videoLayer.player).on("ended", (function(_this) {
      return function() {
        var i, layer, len, ref, results;
        _this.emit("video:ended");
        _this._currentlyPlaying = false;
        _this.videoLayer.player.pause();
        _this.playButton.animateStop();
        if (_this._shyControls) {
          _this.playButton.opacity = 1;
          ref = _this._controlsArray;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            layer = ref[i];
            layer.animateStop();
            results.push(layer.opacity = 1);
          }
          return results;
        }
      };
    })(this));
    this.videoLayer.video = options.video;
    this.timeStyle = {
      "font-size": "20px",
      "color": "#000"
    };
    this.videoLayer.formatTime = function() {
      var min, sec;
      sec = Math.floor(this.player.currentTime);
      min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : "0" + sec;
      return min + ":" + sec;
    };
    this.videoLayer.formatTimeLeft = function() {
      var min, sec;
      sec = Math.floor(this.player.duration) - Math.floor(this.player.currentTime);
      min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : "0" + sec;
      return min + ":" + sec;
    };
  }

  VideoPlayer.define("video", {
    get: function() {
      return this.videoLayer.player.src;
    },
    set: function(video) {
      return this.videoLayer.player.src = video;
    }
  });

  VideoPlayer.define("showProgress", {
    get: function() {
      return this._showProgress;
    },
    set: function(showProgress) {
      return this.setProgress(showProgress);
    }
  });

  VideoPlayer.define("showTimeElapsed", {
    get: function() {
      return this._showTimeElapsed;
    },
    set: function(showTimeElapsed) {
      return this.setTimeElapsed(showTimeElapsed);
    }
  });

  VideoPlayer.define("showTimeLeft", {
    get: function() {
      return this._showTimeLeft;
    },
    set: function(showTimeLeft) {
      return this.setTimeLeft(showTimeLeft);
    }
  });

  VideoPlayer.define("showTimeTotal", {
    get: function() {
      return this._showTimeTotal;
    },
    set: function(showTimeTotal) {
      return this.setTimeTotal(showTimeTotal);
    }
  });

  VideoPlayer.define("shyPlayButton", {
    get: function() {
      return this._shyPlayButton;
    },
    set: function(shyPlayButton) {
      return this.setShyPlayButton(shyPlayButton);
    }
  });

  VideoPlayer.define("shyControls", {
    get: function() {
      return this._shyControls;
    },
    set: function(shyControls) {
      return this.setShyControls(shyControls);
    }
  });

  VideoPlayer.define("playButtonImage", {
    get: function() {
      return this.playimage;
    },
    set: function(playButtonImage) {
      return this.setPlayButtonImage(playButtonImage);
    }
  });

  VideoPlayer.define("pauseButtonImage", {
    get: function() {
      return this.pauseimage;
    },
    set: function(pauseButtonImage) {
      return this.setPauseButtonImage(pauseButtonImage);
    }
  });

  VideoPlayer.define("player", {
    get: function() {
      return this.videoLayer.player;
    }
  });

  VideoPlayer.prototype.setProgress = function(showProgress) {
    this._showProgress = showProgress;
    this.progressBar = new SliderComponent({
      width: 440,
      height: 10,
      knobSize: 40,
      backgroundColor: "#ccc",
      min: 0,
      value: 0,
      name: "progressBar"
    });
    this._controlsArray.push(this.progressBar);
    this.progressBar.knob.draggable.momentum = false;
    Events.wrap(this.videoLayer.player).on("canplay", (function(_this) {
      return function() {
        return _this.progressBar.max = Math.round(_this.videoLayer.player.duration);
      };
    })(this));
    Events.wrap(this.videoLayer.player).on("timeupdate", (function(_this) {
      return function() {
        return _this.progressBar.knob.midX = _this.progressBar.pointForValue(_this.videoLayer.player.currentTime);
      };
    })(this));
    this.progressBar.on("change:value", (function(_this) {
      return function() {
        if (_this._currentlyPlaying) {
          return _this.videoLayer.player.currentTime = _this.progressBar.value;
        }
      };
    })(this));
    this.progressBar.knob.on(Events.DragStart, (function(_this) {
      return function() {
        _this._isScrubbing = true;
        if (_this._currentlyPlaying) {
          return _this.videoLayer.player.pause();
        }
      };
    })(this));
    return this.progressBar.knob.on(Events.DragEnd, (function(_this) {
      return function() {
        _this._isScrubbing = false;
        _this.videoLayer.player.currentTime = _this.progressBar.value;
        if (_this._currentlyPlaying) {
          return _this.videoLayer.player.play();
        }
      };
    })(this));
  };

  VideoPlayer.prototype.setShyPlayButton = function(shyPlayButton) {
    return this._shyPlayButton = shyPlayButton;
  };

  VideoPlayer.prototype.fadePlayButton = function() {
    return this.playButton.animate({
      properties: {
        opacity: 0
      },
      time: 2
    });
  };

  VideoPlayer.prototype.setShyControls = function(shyControls) {
    return this._shyControls = shyControls;
  };

  VideoPlayer.prototype.fadeControls = function() {
    var i, index, layer, len, ref, results;
    ref = this._controlsArray;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      layer = ref[index];
      results.push(layer.animate({
        properties: {
          opacity: 0
        },
        time: 2
      }));
    }
    return results;
  };

  VideoPlayer.prototype.setTimeElapsed = function(showTimeElapsed) {
    this._showTimeElapsed = showTimeElapsed;
    if (showTimeElapsed === true) {
      this.timeElapsed = new Layer({
        backgroundColor: "transparent",
        name: "currentTime"
      });
      this._controlsArray.push(this.timeElapsed);
      this.timeElapsed.style = this.timeStyle;
      this.timeElapsed.html = "0:00";
      return Events.wrap(this.videoLayer.player).on("timeupdate", (function(_this) {
        return function() {
          return _this.timeElapsed.html = _this.videoLayer.formatTime();
        };
      })(this));
    }
  };

  VideoPlayer.prototype.setTimeLeft = function(showTimeLeft) {
    this._showTimeLeft = showTimeLeft;
    if (showTimeLeft === true) {
      this.timeLeft = new Layer({
        backgroundColor: "transparent",
        name: "timeLeft"
      });
      this._controlsArray.push(this.timeLeft);
      this.timeLeft.style = this.timeStyle;
      this.timeLeft.html = "-0:00";
      Events.wrap(this.videoLayer.player).on("loadedmetadata", (function(_this) {
        return function() {
          return _this.timeLeft.html = "-" + _this.videoLayer.formatTimeLeft();
        };
      })(this));
      return Events.wrap(this.videoLayer.player).on("timeupdate", (function(_this) {
        return function() {
          return _this.timeLeft.html = "-" + _this.videoLayer.formatTimeLeft();
        };
      })(this));
    }
  };

  VideoPlayer.prototype.setTimeTotal = function(showTimeTotal) {
    this._showTimeTotal = showTimeTotal;
    if (showTimeTotal === true) {
      this.timeTotal = new Layer({
        backgroundColor: "transparent",
        name: "timeTotal"
      });
      this._controlsArray.push(this.timeTotal);
      this.timeTotal.style = this.timeStyle;
      this.timeTotal.html = "0:00";
      return Events.wrap(this.videoLayer.player).on("loadedmetadata", (function(_this) {
        return function() {
          return _this.timeTotal.html = _this.videoLayer.formatTimeLeft();
        };
      })(this));
    }
  };

  VideoPlayer.prototype.setPlayButtonImage = function(image) {
    this.playimage = image;
    this.playButton.image = image;
    return this.playButton.showPlay = function() {
      return this.image = image;
    };
  };

  VideoPlayer.prototype.setPauseButtonImage = function(image) {
    this.pauseimage = image;
    return this.playButton.showPause = function() {
      return this.image = image;
    };
  };

  return VideoPlayer;

})(Layer);
