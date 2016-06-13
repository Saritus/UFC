var background, input_audio, input_lyric, input_ufg, label_audio, label_ufg, logo, version;

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
  html: "<b>Version: 0.4.31</b>"
});

version.fluid({
  xAlign: 'left',
  yOffset: -5,
  yAlign: 'bottom'
});

label_audio = new Layer({
  width: 670,
  height: 70
});

label_audio.centerX();

label_audio.fluid({
  yAlign: 'bottom',
  yOffset: -480
});

input_audio = new Input({
  setup: true,
  placeholder: "Audio-Datei",
  placeholderColor: "#fff",
  type: "text",
  width: 650,
  height: 50
});

input_audio.centerX();

input_audio.fluid({
  yAlign: 'bottom',
  yOffset: -400
});

input_lyric = new Input({
  setup: true,
  placeholder: "Lyric-Datei",
  placeholderColor: "#fff",
  type: "text",
  width: 650,
  height: 50
});

input_lyric.centerX();

input_lyric.fluid({
  yAlign: 'bottom',
  yOffset: -300
});

label_ufg = new Layer({
  width: 670,
  height: 70
});

label_ufg.centerX();

label_ufg.fluid({
  yAlign: 'bottom',
  yOffset: -180
});

input_ufg = new Input({
  setup: true,
  placeholder: "UFG-Datei",
  placeholderColor: "#fff",
  type: "text",
  width: 650,
  height: 50
});

input_ufg.centerX();

input_ufg.fluid({
  yAlign: 'bottom',
  yOffset: -100
});

window.addEventListener('resize', (function(event) {
  logo.centerX();
  input_ufg.centerX();
  input_audio.centerX();
  input_lyric.centerX();
  return label_ufg.centerX();
}), false);
