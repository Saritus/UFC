var audio, background, input_audio, input_lyric, input_ufg, label_audio, label_ok, label_ufg, logo, ufg, version;

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
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  height: 50,
  html: "<p><center><b>Version: 0.4.35</b></center></p>"
});

version.fluid({
  xAlign: 'left',
  yAlign: 'bottom',
  autoWidth: true
});

audio = new Layer({
  width: 600,
  height: 270
});

audio.centerX();

audio.fluid({
  yAlign: 'bottom',
  yOffset: -380
});

label_audio = new Layer({
  parent: audio,
  width: 470,
  height: 70
});

label_audio.centerX();

label_audio.fluid({
  yAlign: 'bottom',
  yOffset: -200
});

input_audio = new Input({
  parent: audio,
  setup: true,
  placeholder: "Audio-Datei",
  placeholderColor: "#fff",
  type: "text",
  width: 450,
  height: 50
});

input_audio.centerX();

input_audio.fluid({
  yAlign: 'bottom',
  yOffset: -120
});

input_lyric = new Input({
  parent: audio,
  setup: true,
  placeholder: "Lyric-Datei",
  placeholderColor: "#fff",
  type: "text",
  width: 450,
  height: 50
});

input_lyric.centerX();

input_lyric.fluid({
  yAlign: 'bottom',
  yOffset: -20
});

ufg = new Layer({
  width: 600,
  height: 170
});

ufg.centerX();

ufg.fluid({
  yAlign: 'bottom',
  yOffset: -180
});

label_ufg = new Layer({
  parent: ufg,
  width: 470,
  height: 70
});

label_ufg.centerX();

label_ufg.fluid({
  yAlign: 'bottom',
  yOffset: -100
});

input_ufg = new Input({
  parent: ufg,
  setup: true,
  placeholder: "UFG-Datei",
  placeholderColor: "#fff",
  type: "text",
  width: 450,
  height: 50
});

input_ufg.centerX();

input_ufg.fluid({
  yAlign: 'bottom',
  yOffset: -20
});

label_ok = new Layer({
  width: 470,
  height: 70,
  image: "resources/okButton.png"
});

label_ok.centerX();

label_ok.fluid({
  yAlign: 'bottom',
  yOffset: -80
});

window.addEventListener('resize', (function(event) {
  logo.centerX();
  audio.centerX();
  ufg.centerX();
  input_ufg.centerX();
  input_audio.centerX();
  input_lyric.centerX();
  label_ufg.centerX();
  label_audio.centerX();
  return label_ok.centerX();
}), false);
