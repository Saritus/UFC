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
  html: "<p><center><b>Version: 0.4.57</b></center></p>"

version.fluid
  xAlign: 'left'
  #yOffset: -5
  yAlign: 'bottom'
  autoWidth: true

audio = new Layer
  width: 600
  height: 270
  backgroundColor: "rgba(0, 0, 0, 0)"
audio.centerX()

audio.fluid
  yAlign: 'bottom'
  yOffset: -380

label_audio = new Layer
  parent: audio
  width: audio.width
  height: 70
  html: "<p><h1><center>Audio</center></h1></p>"
  backgroundColor: "rgba(0, 0, 0, 0.35)"
label_audio.centerX()

input_audio = new Input
  parent: audio
  setup: true # Change to true when positioning the input so you can see it
  placeholder: "Audio-Datei"
  placeholderColor: "#fff"
  type: "text"
  width: 450
  height: 50
  y: audio.height - 170

button_audio = new Layer
  parent: audio
  width: 70
  height: 70
  x: audio.width - 70
  y: audio.height - 170
  image: "blues/folder_open.png"

button_audio.on Events.Click, ->
  load_audio.click()

input_lyric = new Input
  parent: audio
  setup: true # Change to true when positioning the input so you can see it
  placeholder: "Lyric-Datei"
  placeholderColor: "#fff"
  type: "text"
  width: 450
  height: 50
  y: audio.height - 70

button_lyric = new Layer
  parent: audio
  width: 70
  height: 70
  x: audio.width - 70
  y: audio.height - 70
  image: "blues/folder_open.png"

button_lyric.on Events.Click, ->
  load_audio.click()

ufg = new Layer
  width: 600
  height: 170
  backgroundColor: "rgba(0, 0, 0, 0)"
ufg.centerX()

ufg.fluid
  yAlign: 'bottom'
  yOffset: -180

label_ufg = new Layer
  parent: ufg
  width: ufg.width
  height: 70
  html: "<p><h1><center>UFC</center></h1></p>"
  backgroundColor: "rgba(0, 0, 0, 0.35)"
label_ufg.centerX()

input_ufg = new Input
  parent: ufg
  setup: true # Change to true when positioning the input so you can see it
  placeholder: "UFC-Datei"
  placeholderColor: "#fff"
  type: "text"
  width: 450
  height: 50
  y: ufg.height - 70

button_ufg = new Layer
  parent: ufg
  width: 70
  height: 70
  x: ufg.width - 70
  y: ufg.height - 70
  image: "blues/folder_open.png"

button_ufg.on Events.Click, ->
  load_ufg.click()

button_ok = new Layer
  width: audio.width
  height: 70
  image: "resources/okButton.png"
button_ok.centerX()

button_ok.fluid
  yAlign: 'bottom'
  yOffset: -80

button_ok.on Events.Click, ->
  ok_button.click()

window.addEventListener 'resize', ((event) ->
  logo.centerX()
  audio.centerX()
  ufg.centerX()
  button_ok.centerX()
), false
