//declarando variáveis
var trex, trex_running, trexCollided;
var bordas;
var solo, imagemSolo;
var soloInvisivel;
var nuvens, imagemNuvens, nuvemGp;
var cacto, imagemCacto1, imagemCacto2, imagemCacto3, imagemCacto4, imagemCacto5, imagemCacto6, cactoGp;
var pontos = 0;
var play = 1;
var end = 0;
var gameState = play;

//preload carrega as midías
function preload(){
 //animação do Trex
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided = loadAnimation("trex_collided.png");
  imagemNuvens = loadImage('cloud.png');

  imagemCacto1 = loadImage('obstacle1.png');
  imagemCacto2 = loadImage('obstacle2.png');
  imagemCacto3 = loadImage('obstacle3.png');
  imagemCacto4 = loadImage('obstacle4.png');
  imagemCacto5 = loadImage('obstacle5.png');
  imagemCacto6 = loadImage('obstacle6.png');

  //imagem do solo
  imagemSolo = loadImage('ground2.png');
}
//setuo faz aconfiguração
function setup(){
  createCanvas(600,200);
  // criando as bordas
  bordas = createEdgeSprites ();
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  // adicione dimensão e posição ao trex
  trex.addAnimation("running", trex_running);
  trex.scale=0.5;
  //sprite do solo
  solo = createSprite(300, 170, 600, 2);
  solo.addImage('solo', imagemSolo);
  soloInvisivel = createSprite(300, 190, 600, 2);
  soloInvisivel.visible = false;

  trex.addAnimation("collide", trexCollided);

  nuvemGp = new Group();
  cactosGp = new Group();
}
//draw faz o movimento, a ação do jogo
function draw(){
  if (trex.isTouching(cactosGp)) {
  gameState=end;  
  }

  if (gameState===play) {
    pontos = Math.round(frameCount/5);
    if (keyDown("space")&& trex.y > 100){
      trex.velocityY = -10;
 }
 solo.velocityX = -10;
 if(solo.x < 0){
    solo.x=solo.width/2;
 }
 createClounds();
 cactos();
  }
  if (gameState===end) {
    trex.changeAnimation("collide", trexCollided);
    solo.velocityX = 0;
    cactoGp.setVelocityXEach (0);
    nuvemGp.setVelocityXEach (0);
  }
  background("#def6ff");
  // fazero trex pular
 //coordenadas do mouse na tela
  text("X: "+mouseX+"  / Y: "+mouseY,mouseX,mouseY);
  
  fill('pink');
  stroke('purple');
  textSize(18);
  textAlign(CENTER, TOP);
  text("score: "+ pontos,  498, 30);
  
 // chamando a  função de gravidade
  gravidade();
  //colisão do trex com as bordas
  trex.collide (soloInvisivel);
  
  //console.log(trex.y);

  drawSprites();

}
// função de gravidade
function gravidade(){
  trex.velocityY += 0.5;
}

function createClounds() {

  if(frameCount%60==0){
  nuvens = createSprite(600, random(54, 94), 20, 20);
  nuvens.velocityX = -3; 
  nuvens.addImage(imagemNuvens);
  nuvens.scale = random(0.3, 1.7);
  nuvens.depth = trex.depth - 1;
  nuvens.lifetime = 210;
  nuvemGp.add(nuvens);
}
}

function cactos() {
  
  if (frameCount%100==0) {
    cacto = createSprite(600, 170);
    cacto.velocityX = -3;
    cacto.scale = 0.5;
    cacto.lifetime = 210;
    cactosGp.add(cacto);
    var sorteioCactos = Math.round(random(1, 6));
    switch (sorteioCactos) {
      case 1: cacto.addImage(imagemCacto1);
      break;  
      
      case 2: cacto.addImage(imagemCacto2);
      break;   

      case 3: cacto.addImage(imagemCacto3);   
      break;   

      case 4: cacto.addImage(imagemCacto4);   
      break;   

      case 5: cacto.addImage(imagemCacto5);   
      break;

      case 6: cacto.addImage(imagemCacto6);
      break;
    }
  }
}