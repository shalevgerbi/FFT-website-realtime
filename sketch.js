var song;
var fft;
var button;
var songidx=0;
var volhistory =[];
var w;

function nextSong(){
  if(songidx == 0){
    setTimeout(preload(),100);
    //song = loadSound('demo.mp3');
    songidx++; 
    
    }
    else{
      setTimeout(preload(),100);
      //song = loadSound('demo-beat.mp3')
    songidx--;
    
    }
}
function toggleSong() {
  if (song.isPlaying()) {
    song.stop();

    nextSong();    
    
    song.play();
  }
  else {
     
   nextSong();

   song.play();
  
  }
   

  
}


function preload() {
  if(songidx==1){
   song = loadSound('demo-beat.mp3');
  }
  else{
    song = loadSound('demo.mp3');
  }
}

function setup() {
  createCanvas(windowHeight, windowWidth);
  
  angleMode(DEGREES);
  button = createButton('switch song');
  button.mouseClicked(toggleSong);
  song.play();
  fft= new p5.FFT();
  w = width / 64;
   colorMode(HSB);
   //angleMode(DEGREES);
  // button = createButton('toggle');
  // button.mousePressed(toggleSong);
  // song.play();
  // fft = new p5.FFT(0.9, 128);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();

  
 // console.log(spectrum.length)
  noStroke();
  //stroke(255);
  //noFill();
 // var wave = fft.waveform();

  // beginShape();
  for(var i = 0 ; i< spectrum.length ; i++) {
    var amp = spectrum[i];
    
    if(spectrum[i]<65.41 && spectrum[i]> 58.27 )
      console.log("B1");
    var y = map(amp,0,256,height,0);
    //line(i,height,i,y);
    fill(i,255,255)
    rect(i * w -2, y, w, height -y);
    // num = getEnergy(63,80);
    //var index = floor(map(i, 0, width, 0, wave.length));
   
    //var x = i;
    //var y = wave[index] * 300 + height / 2;
    //vertex(x,y);
  }
  stroke(255)
  // endShape();

  noFill();
   
  // //console.log(spectrum);
  // //stroke(255);
  // noStroke();
  // translate(width / 2, height / 2);
  // //beginShape();
  // for (var i = 0; i < spectrum.length; i++) {
  //   var angle = map(i, 0, spectrum.length, 0, 360);
  //   var amp = spectrum[i];
  //   var r = map(amp, 0, 256, 20, 100);
  //   //fill(i, 255, 255);
  //   var x = r * cos(angle);
  //   var y = r * sin(angle);
  //   stroke(i, 255, 255);
  //   line(0, 0, x, y);
  //   //vertex(x, y);
  //   //var y = map(amp, 0, 256, height, 0);
  //   //rect(i * w, y, w - 2, height - y);
  // }
  //endShape();
}
function mouseClicked(){
  if(song.isPlaying()){
    song.pause();
    noLoop()
  }
  else{
    song.play();
    loop();
  }
}