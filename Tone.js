var Tone,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Tone = (function(superClass) {
  extend(Tone, superClass);

  function Tone(options) {
    if (options == null) {
      options = {};
    }
    this.Layer = null;
    this.text = "";
    this.start = 0;
    this.length = 1;
    this.pitch = 0;
    if (options.backgroundColor == null) {
      options.backgroundColor = "rgb(0, 0, 0)";
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
    Tone.__super__.constructor.call(this, {
      width: options.width,
      height: options.height,
      x: options.x,
      y: options.y,
      backgroundColor: null
    });
  }

  return Tone;

})(Layer);
