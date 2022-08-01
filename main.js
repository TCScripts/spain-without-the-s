Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
var camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("view").innerHTML='<img id="webview" src="'+data_uri+'">';
    });
}
console.log("ml5 version:", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IvJihQm29/model.json', modelloaded);
function modelloaded(){
    console.log("model loaded");
    
}
p1="";
p2="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The First Prediction Is "+ p1;
    speak_data_2="The Second Prediction Is"+ p2;
    var utter=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utter);
}
function check(){
    img=document.getElementById("webview");
    classifier.classify(img,gotresult);
}
function gotresult(error,result){
    if (error){
        console.error(error)
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name1").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        p1=result[0].label;
        p2=result[1].label;
      if (result[0].label=="happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;";
      }  
      if (result[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"; 
      }
      if (result[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;"; 
      } 
      if (result[1].label=="happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;";
      }  
      if (result[1].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"; 
      }
      if (result[1].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;"; 
      } 
    }
}