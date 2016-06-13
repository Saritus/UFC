var background, version;

background = new BackgroundLayer;

version = new Layer({
  backgroundColor: "rgba(0, 0, 0, 1)",
  width: 150,
  height: 20,
  html: "<b>Version: 0.4.24</b>"
});

version.fluid({
  xAlign: 'left',
  yOffset: -5,
  yAlign: 'bottom'
});
