var character = document.querySelector(".character");
var map = document.querySelector(".map");
var upstairs = document.getElementById("upstairs");
var char = document.getElementById("character");
var dialog = document.getElementById("dialog");
var loader = document.getElementById("preloader");
var interactText = document.getElementById("interactText");
var aboutme = document.getElementById("aboutme");
var computer = document.getElementById("computer");
var contactme = document.getElementById("contactme");


var data = false;
var text = '';
var i = 0;
var typingSpeed = 50;
var selectedRoom = 1;
var semafoor = false;
var busy = false;
//start in the middle of the map
var x = 87;
var y = 44;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

document.addEventListener("keyup", function (event) {
   if (event.keyCode === 69) {
   }
});

const placeCharacter = () => {

   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );

   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) { x += speed; }
      if (held_direction === directions.left) { x -= speed; }
      if (held_direction === directions.down) { y += speed; }
      if (held_direction === directions.up) { y -= speed; }
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   if (selectedRoom === 0) {
      selectedRoom = 1;
   }
   if (selectedRoom === 1) {
      semafoor = false;
      upstairs.style.backgroundImage = `url("img/house.gif")`;
      interactText.style.display = "none";
      var leftLimit = -2;
      var rightLimit = (16 * 11) + 2;
      var topLimit = 29;
      var bottomLimit = 150;
      //shelf
      if (x > 170 && y === 48) { y = 47; }
      if (x === 170 && y > 48 && y < 135) { x = 169; }
      if (x > 170 && y === 135) { y = 136; }
      //desk
      if (x > 28 && x < 150 && y === 58) { y = 57; }
      if (x === 28 && y > 58 && y < 128) { x = 27; }
      if (x > 28 && x < 150 && y === 128) { y = 129; }
      if (x === 150 && y > 58 && y < 128) { x = 151; }
      //bank
      if (x < 4 && y === 44) { y = 43; }
      if (x === 4 && y > 44 && y < 90) { x = 5; }
      if (x < 4 && y === 90) { y = 91; }
      //interactions
      if (x === 27 && y > 86 && y < 101) {
         interactText.style.display = "block";
         document.addEventListener("keyup", function (event) {
            if (event.keyCode === 69) {
               aboutme.style.display = "block";
               interactText.style.display = "none";
            }
         });
      } else {
         aboutme.style.display = "none";
      }
      if (x > 83 && x < 99 && y === 129) {
         interactText.style.display = "block"; document.addEventListener("keyup", function (event) {
            if (event.keyCode === 69) {
               computer.style.display = "block";
               interactText.style.display = "none";
            }
         });
      } else {
         computer.style.display = "none";
      }

      if (x === 151 && y > 86 && y < 101) {
         interactText.style.display = "block"; document.addEventListener("keyup", function (event) {
            if (event.keyCode === 69) {
               contactme.style.display = "block";
               interactText.style.display = "none";
            }
         });
      } else {
         contactme.style.display = "none";
      }

      
   }
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   console.log(x, y);
   console.log(busy);
   character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
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

if (!busy) {
   console.log("busy");
   console.log(busy);
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
}

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
      document.querySelector(".dpad-" + direction).classList.add("pressed");
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
   if (computer.style.display === "block") {
      computer.style.display = "none"
   } else {
      computer.style.display = "block"
   }
   upstairs.style.backgroundImage = `url("img/upstairs.gif")`;
   setTimeout(() => { selectedRoom = 0 }, 500);
}

function typeWriter() {
   if (i < text.length) {
      document.getElementById("dialogText").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, typingSpeed);
   }
}

function openAboutMe() {
   var x = document.getElementById("aboutme");
   if (x.style.display === "none") {
      x.style.display = "block";
   } else {
      x.style.display = "none";
   }
}

function openMyWork() {

}

function openContactMe() {
   var x = document.getElementById("contactme");
   if (x.style.display === "none") {
      x.style.display = "block";
   } else {
      x.style.display = "none";
   }
}

window.addEventListener("load", function () {
   setTimeout(function () {
      loader.style.display = "none";
   }, 1000)
});