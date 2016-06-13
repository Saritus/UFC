var background, logo, version;

background = new Layer({
  image: "resources/background2.png"
});

background.fluid({
  autoWidth: true,
  autoHeight: true
});

logo = new Layer({
  width: 670,
  height: 330,
  image: "resources/UFCLogo.png"
});

logo.centerX();

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
