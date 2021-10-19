
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let gazo;
  let gazo1;
  let gazo2;
  let gazo3;
　　　let myText;
  let kp; 
  let key;


  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    gazo = loadImage('oisi.jpg');
    gazo1=loadImage('futsu.jpg');
    gazo2=loadImage('mu.jpg');
    tree1=loadImage('tree01.png');
    tree2=loadImage('tree02.png');
    tree3=loadImage('tree03.png');
    tree4=loadImage('tree04.png');
    tree5=loadImage('tree05.png');
    tree6=loadImage('tree06.png');
    tree7=loadImage('tree07.png');
    tree8=loadImage('tree08.png');
    tree9=loadImage('tree09.png');
  }

  function setup() {
    createCanvas(296, 600);
    // Create the video
    video = createCapture(VIDEO);
    video.size(295, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
    
    myText=getItem('o');
    if(myText===null){
      myText=0;
    }
    
    key=getItem('n');
    if(key===null){
      key=0;
    }
    myText=myText+key;
  }

  function draw() {
    background(0);
    image(flippedVideo, 0, 0);
    
    // Draw the video
      if(label=="野菜"||label=="納豆"||label=="うどん"){
        image(gazo, 0, 240);
        key=2;
      }else if(label=="sweets"||label=="ラーメン"){
        image(gazo2,0,240);
        key=-1;
      }else{
        image(gazo1,0,240);
      }
    
    storeItem('n',key);
    storeItem('o',myText);
    
    if(myText>7){
      image(tree9,130,260);
    }else if(myText>6){
      image(tree8,130,260);
    }else if(myText>5){
      image(tree7,145,300);
    }else if(myText>4){
      image(tree6,150,400);
    }else if(myText>3){
      image(tree5,160,410);
    }else if(myText>2){
      image(tree4,170,480);
    }else if(myText>1){
      image(tree3,190,505);
    }else if(myText>0){
      image(tree2,200,520);
    }else{
      image(tree1,200,540);
    }
    

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(myText, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    
    // Classifiy again!
    
    label = results[0].label;
    classifyVideo();
  }

