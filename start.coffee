background = new Layer
  image: "resources/background2.png"

background.fluid
  autoWidth: true
  autoHeight: true

logo = new Layer
  width: 670
  height: 330
  image: "resources/UFCLogo.png"
logo.centerX()

version = new Layer
  backgroundColor: "rgba(0, 0, 0, 0.5)"
  height: 50
  html: "<p><center><b>Version: 0.4.31</b></center></p>"

version.fluid
  xAlign: 'left'
  #yOffset: -5
  yAlign: 'bottom'
  autoWidth: true

audio = new Layer
  width: 600

label_audio = new Layer
  width: 470
  height: 70
label_audio.centerX()

label_audio.fluid
  yAlign: 'bottom'
  yOffset: -580

input_audio = new Input
  setup: true # Change to true when positioning the input so you can see it
  placeholder: "Audio-Datei"
  placeholderColor: "#fff"
  type: "text"
  width: 450
  height: 50
input_audio.centerX()

input_audio.fluid
  yAlign: 'bottom'
  yOffset: -500

input_lyric = new Input
  setup: true # Change to true when positioning the input so you can see it
  placeholder: "Lyric-Datei"
  placeholderColor: "#fff"
  type: "text"
  width: 450
  height: 50
input_lyric.centerX()

input_lyric.fluid
  yAlign: 'bottom'
  yOffset: -400

label_ufg = new Layer
  width: 470
  height: 70
label_ufg.centerX()

label_ufg.fluid
  yAlign: 'bottom'
  yOffset: -280

input_ufg = new Input
  setup: true # Change to true when positioning the input so you can see it
  placeholder: "UFG-Datei"
  placeholderColor: "#fff"
  type: "text"
  width: 450
  height: 50
input_ufg.centerX()

input_ufg.fluid
  yAlign: 'bottom'
  yOffset: -200

label_ok = new Layer
  width: 470
  height: 70
  image: "resources/okButton.png"
label_ok.centerX()

label_ok.fluid
  yAlign: 'bottom'
  yOffset: -80

window.addEventListener 'resize', ((event) ->
  logo.centerX()
  input_ufg.centerX()
  input_audio.centerX()
  input_lyric.centerX()
  label_ufg.centerX()
  label_audio.centerX()
  label_ok.centerX()
), false
