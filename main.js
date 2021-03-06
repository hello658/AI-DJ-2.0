song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
  song = loadSound("music copy.mp3");
}

function setup() {
canvas = createCanvas(600,500);
canvas.center();


video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded() {
 console.log('poseNet Is Initialized');
}

function gotPoses(results)
{
if(results.length > 0)
{
 console.log(results);
 scoreRightWrist = results[0].pose.keypoints[9].score;
 scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreLeftwrist = " + scoreLeftWrist);


 leftWristX = results[0].pose.leftWristX.x;
 leftWristY = results[0].pose.leftWristY.y;
 console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristX);

 rightWristX = results[0].pose.rightWristX.x;
 rightWristY = results[0].pose.rightWristY.y;
 console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristX)
}
}

function draw() {
 image(video, 0, 0, 600, 500);

fill("#FF0000");
stroke("#FF0000");

circle(0rightWristX,rightWristY)

if(scoreLeftWrist > 0.2)
{
if(rightWristY >0 && rightWristY <= 100)
{
document.getElementById("speed").innerHTML = "Speed = 0.5x";
}
else if(rightWristY >100 && rightWristY <= 200)
{
document.getElementById("speed").innerHTML = "Speed = 1x";
}
if(rightWristY >200 && rightWristY <= 300)
{
document.getElementById("speed").innerHTML = "Speed = 1.5x";
}
if(rightWristY >300 && rightWristY <= 400)
{
document.getElementById("speed").innerHTML = "Speed = 2x";
}
if(rightWristY >400 && rightWristY <= 500)
{
document.getElementById("speed").innerHTML = "Speed = 2.5x";
}
}

if(scoreLeftWrist > 0.2)
{

circle(leftWristX, leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "Volume = " + volume
sessionStorage.setVolume(volume);
 } 
}

function play()
{
song.play();
song.setvolume(1);
song.rate(1);
}

function modelLoaded() {
console.log('PoseNet Is Initilized');
}