const video = document.getElementById("webcam");
const label = document.getElementById("label");
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")
const speakbtn = document.querySelector("#speak");
let synth = window.speechSynthesis
let challenge1 = null
let score = 0

function modelLoaded() {
    featureExtractor.load(filesOrPath = "./model/model_4.json");
    console.log('Model Loaded!')
    classifier = featureExtractor.classification(image, challenge)
    label.innerHTML = "Model Loaded";
}

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})
image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

function videoReady(){
    console.log("the webcam is ready")
}

function challenge() {
    console.log("CHallenge time")
    challenge1 = "happy"
    speak("Show me a happy person")
}

setInterval(()=>{
    classifier.classify(image, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        label.innerHTML = result[0].label
        speak(result[0].label)
        if (result[0].label == challenge1) {
            speak("Well done!")
            score = 10
        }
    })
}, 1000)


