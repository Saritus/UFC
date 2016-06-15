var FluidFramer;

Layer.prototype.fluid = function(options) {
  if (options == null) {
    options = {};
  }
  return Framer.Fluid.register(this, options);
};

Layer.prototype["static"] = function() {
  return Framer.Fluid.unregister(this);
};

Layer.prototype.fix = function() {
  return Framer.Fluid.fix(this);
};

Layer.prototype.unfix = function() {
  return Framer.Fluid.unfix(this);
};

FluidFramer = (function() {
  var registry;

  registry = [];

  function FluidFramer() {
    var self;
    self = this;
    window.onresize = (function(_this) {
      return function(evt) {
        return _this._respond();
      };
    })(this);
  }

  FluidFramer.prototype.register = function(layer, options) {
    if (options == null) {
      options = {};
    }
    return this._addLayer(layer, options);
  };

  FluidFramer.prototype.unregister = function(layer) {
    return this._removeLayer(layer);
  };

  FluidFramer.prototype.fix = function(layer) {
    layer.style = {
      position: 'fixed'
    };
    return layer;
  };

  FluidFramer.prototype.unfix = function(layer) {
    layer.style = {
      position: 'absolute'
    };
    return layer;
  };

  FluidFramer.prototype.layers = function() {
    return registry;
  };

  FluidFramer.prototype._respond = function() {
    var self;
    self = this;
    return _.each(registry, function(obj, index) {
      return self._refreshLayer(obj);
    });
  };

  FluidFramer.prototype._refreshLayer = function(obj) {
    var layer, newHeight, newWidth, newX, newY;
    layer = obj.targetLayer;
    if (obj.autoWidth != null) {
      newWidth = obj.widthOffset != null ? this._parentWidth(layer) + obj.widthOffset : this._parentWidth(layer);
      layer.width = newWidth;
      layer.style = {
        backgroundPosition: 'center'
      };
    }
    if (obj.autoHeight != null) {
      newHeight = obj.heightOffset != null ? this._parentHeight(layer) + obj.heightOffset : this._parentHeight(layer);
      layer.height = newHeight;
      layer.style = {
        backgroundPosition: 'center'
      };
    }
    switch (obj.xAlign) {
      case 'left':
        layer.x = this._xWithOffset(obj, 0);
        break;
      case 'right':
        newX = this._parentWidth(layer) - layer.width;
        layer.x = this._xWithOffset(obj, newX);
        break;
      case 'center':
        layer.centerX();
        layer.x = this._xWithOffset(obj, layer.x);
        break;
      case 'middle':
        layer.centerX();
        layer.x = this._xWithOffset(obj, layer.x);
    }
    switch (obj.yAlign) {
      case 'bottom':
        newY = this._parentHeight(layer) - layer.height;
        return layer.y = this._yWithOffset(obj, newY);
      case 'top':
        return layer.y = this._yWithOffset(obj, 0);
      case 'middle':
        layer.centerY();
        return layer.y = this._yWithOffset(obj, layer.y);
      case 'center':
        layer.centerY();
        return layer.y = this._yWithOffset(obj, layer.y);
    }
  };

  FluidFramer.prototype._xWithOffset = function(obj, x) {
    return x = obj.xOffset != null ? x + obj.xOffset : x;
  };

  FluidFramer.prototype._yWithOffset = function(obj, y) {
    return y = obj.yOffset != null ? y + obj.yOffset : y;
  };

  FluidFramer.prototype._parentWidth = function(layer) {
    if (layer.superLayer != null) {
      return layer.superLayer.width;
    } else {
      return window.innerWidth;
    }
  };

  FluidFramer.prototype._parentHeight = function(layer) {
    if (layer.superLayer != null) {
      return layer.superLayer.height;
    } else {
      return window.innerHeight;
    }
  };

  FluidFramer.prototype._addLayer = function(layer, options) {
    var obj, self;
    if (options == null) {
      options = {};
    }
    obj = _.extend(options, {
      targetLayer: layer
    });
    registry.push(obj);
    self = this;
    Utils.domComplete(function() {
      return self._refreshLayer(obj, self);
    });
    return layer;
  };

  FluidFramer.prototype._removeLayer = function(layer) {
    var target;
    target = _.findWhere(registry, {
      targetLayer: layer
    });
    if (target == null) {
      return layer;
    }
    if ((target.autoWidth != null) || (target.autoHeight != null)) {
      target.style = {
        backgroundPosition: 'initial'
      };
    }
    registry = _.without(registry, target);
    return target;
  };

  return FluidFramer;

})();

Framer.Fluid = new FluidFramer;
