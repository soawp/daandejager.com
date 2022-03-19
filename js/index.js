var character = document.querySelector(".character");
var map = document.querySelector(".map");
var upstairs = document.getElementById("upstairs");
var computer = document.getElementById("computer");
var char = document.getElementById("character");
var dialog = document.getElementById("dialog");

var data = false;
var text = '';
var i = 0;
var typingSpeed = 50;
var selectedRoom = 1;
var semafoor = false;
//start in the middle of the map
var x = 90;
var y = 78;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   if (selectedRoom === 0 ){
      selectedRoom = 1;
   } 
   if (selectedRoom === 1) {
   semafoor = false;
   upstairs.style.backgroundImage = `url("img/upstairs.gif")`;
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = 29;
   var bottomLimit = 150;
    // desk
    if (x === 23 && y < 36) { x = 24; } 
    if (x < 23 && y === 36) {selectedRoom = 4;}
    // table 
    if (x === 136 && y < 43) { x = 135; }
    if (x > 144 && y < 43) { y = 43; }
    // bed
    if (x === 157 && y < 58) {x = 156; }
    if (x > 156 && y < 58) { y = 58; }
    // couch & plant
    if (x < 8 && y === 61) { y = 60; }
    if (x === 8 && y > 61 && y < 118) { x = 9; }
    if (x < 6 && y === 119) {y = 120; }
    // table
    if (x > 14 && x < 46 && y === 64) { y = 63; }
    if (x > 14 && x < 46 && y === 100) { y = 101; }
    if (x === 51 && y > 64 && y < 101) { x = 52; }
    if (x === 14 && y > 64 && y < 101) { x = 13; }
      // couch & plant
    if (x > 172 && y === 138) { y = 139; }
    if (x === 170 && y > 84 && y < 140) { x = 169; }
    if (x > 172 && y === 84) { y = 83; }
    // stairs
    if (x === 92 && y > 130) { selectedRoom = 2; x = 18; y = 40; }
    if (x > 92 && x < 130 && y > 125) { y = 125; }
    if (x === 131 && y > 130) { x = 132; }
   } else if (selectedRoom === 2) {
      var leftLimit = -8;
      var rightLimit = (16 * 11)+8;
      var topLimit = 29;
      var bottomLimit = 150;
      upstairs.style.backgroundImage = `url("img/downstairs.gif")`;
      //stairs
      if (x === 16 && y < 50) { x = 17; selectedRoom = 1; x = 90; y = 140;}
      if (x < 16 && y === 51) { y = 52; }
      if (x < 3 && y < 58) { x = 3; }
      if (x < 3 && y === 58) { y = 59; }
      //shelf
      if (y < 33 && x === 30 ) {x = 31;}
      if (x > 30 && x < 65 && y === 35) {y = 36;}
      if (y < 33 && x === 67 ) {x = 68;}
      //kitchen
      if (y < 48 && x === 137 ) {x = 136;}
      if (x > 137 && y === 40) {y = 41;}
      //dinner table
      if (x > 52 && x < 120 && y === 73 ) { y = 72; }
      if (y > 73 && y < 107 && x === 52) { x = 51; }
      if (x > 52 && x < 120 && y === 107 ) { y = 108; }
      if (y > 73 && y < 107 && x === 123) { x = 124; }
      // plant
      if (x === 171 && y > 121) { x = 170}
      if (x > 171 && y === 121) { y = 120;}
      //door 
      if (x > 78 && x < 98 && y === 29) { selectedRoom = 3; x = 88; y = 130;}
   } else if (selectedRoom === 3) {
      var leftLimit = -8;
      var rightLimit = (16 * 11)+8;
      var topLimit = 50;
      var bottomLimit = 133;
      //bathroom
      upstairs.style.backgroundImage = `url("img/bathroom.gif")`;
      // door
      if (x > 80 && x < 97 && y === 133 ) {selectedRoom = 2; y = 30; x = 77;}
      // middle wall
      if (x > 36 && x < 65 && y === 78) { y = 79; }
      if ( x === 65 && y< 78) { x = 66; }
      if ( x === 36 && y< 78) { x = 35; }
      // bathroom
      if (x === -5 && y < 67) { x = -6; }
      if (x > -5 && x < 26 && y === 67) { y = 68; showData(3);}
      if (y > 69) { hideData();}
      if (x === 26 && y < 67) { x = 27; }
      // right shelves
      if (x > 140 && y === 60) {y = 61;}
      if (y < 60 && x === 140) { x = 139; }
      // toilet 
      if (y < 58 && x === 129) { x = 130; }
      if (y < 58 && x === 107) { x = 106; }
      if (x > 107 && x < 129 && y === 58)  { y = 59;  showData(2);}
      if (x < 107 && x > 129 && y > 58) { hideData();}
      // wasbak
      if (x > 70 && x < 105 &&  y === 56) { y = 57;}
      if (x === 70 && y < 56) { x = 69;}
      if (x === 105 && y < 56) { x = 106;}
   } else if (selectedRoom === 4) {
      if (!semafoor) {
         char.style.display = "none";
         y = 40;
         upstairs.style.backgroundImage = `url("img/pc.gif")`;
         computer.style.display="block"
         semafoor = true;
      }
      var leftLimit = -8;
      var rightLimit = (16 * 11)+8;
      var topLimit = 29;
      var bottomLimit = 150;
       // desk
       if (x === 23 && y < 36) { x = 24; } 
       if (x < 23 && y === 36) {y = 37;}
       // table 
       if (x === 136 && y < 43) { x = 135; }
       if (x > 144 && y < 43) { y = 43; }
       // bed
       if (x === 157 && y < 58) {x = 156; }
       if (x > 156 && y < 58) { y = 58; }
       // couch & plant
       if (x < 8 && y === 61) { y = 60; }
       if (x === 8 && y > 61 && y < 118) { x = 9; }
       if (x < 6 && y === 119) {y = 120; }
       // table
       if (x > 14 && x < 46 && y === 64) { y = 63; }
       if (x > 14 && x < 46 && y === 100) { y = 101; }
       if (x === 51 && y > 64 && y < 101) { x = 52; }
       if (x === 14 && y > 64 && y < 101) { x = 13; }
         // couch & plant
       if (x > 172 && y === 138) { y = 139; }
       if (x === 170 && y > 84 && y < 140) { x = 169; }
       if (x > 172 && y === 84) { y = 83; }
       // stairs
       if (x === 92 && y > 130) { selectedRoom = 2; x = 18; y = 40; }
       if (x > 92 && x < 130 && y > 125) { y = 125; }
       if (x === 131 && y > 130) { x = 132; }
   }
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   console.log(x, y);
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
   87: directions.up,
   65: directions.left,
   83: directions.down,
   68: directions.right,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});

var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));




function hideData() {
    var dialog = document.getElementById("dialog");
    dialog.style.display = "none";
    i = 0;
    document.getElementById("dialogText").innerHTML = "";
} 
function showData(charIndex) {
   var dialog = document.getElementById("dialog");
   if (dialog.style.display === "none") {
      dialog.style.display = "block";
      if (charIndex === 2) {
         i = 0;
         text = "Im taking a shit could you go away"
         dialog.style.backgroundImage = "url('img/jelleDialog.gif')"
         typeWriter();
      }
      if (charIndex === 3) {
         i = 0;
         dialog.style.backgroundImage = "url('img/jitzeDialog.gif')"
         text = "Hey, wanna join me?"
         typeWriter();
      }
   }
}
function closeComputer() {
   char.style.display = "block";
   if(computer.style.display === "block"){
      computer.style.display = "none"
   } else {
      computer.style.display = "block"
   }
   upstairs.style.backgroundImage = `url("img/upstairs.gif")`;
   setTimeout(() => {selectedRoom = 0}, 500);}

function typeWriter() {
  if (i < text.length) {
        document.getElementById("dialogText").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}