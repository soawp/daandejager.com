
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
var infoButton = document.getElementById("infoButton");
var contactButton = document.getElementById("mailButton");


var data = false;
var text = '';
var i = 0;
var typingSpeed = 50;
var selectedRoom = 1;
var semafoor = false;
var busy = false;
//start in the middle of the map
var x = 60;
var y = 140;
var held_directions = []; //State of which arrow keys we are holding down
var speed = .5; //How fast the character moves in pixels per frame

document.addEventListener("keyup", function (event) {
   if (event.keyCode === 69) {
   }
});
infoButton.addEventListener("click", function (event) {
   openAboutDaan();
});
contactButton.addEventListener("click", function (event) {
   window.location.href = "mailto:daandejager2003@gmail.com";
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
      upstairs.style.backgroundImage = `url("img/outside.gif")`;
      interactText.style.display = "none";
      var leftLimit = -2;
      var rightLimit = (16 * 11) + 2;
      var topLimit = 3;
      var bottomLimit = 160;
      //fence and walls
      if (x === 48 && y > 80) { 
         x = 48.5;
      }
      if (x < 48 && y === 80) { 
         y = 79.5;
      }
      //rabbit
      if (x === 39 && y > 63) {
         x = 39.5
      }
      if (x === 16 && y > 63) {
         x = 15.5
      }
      if (x > 16 && x < 39 && y > 63) {
         y = 63;
      }
      //house
      if (x === 112 && y < 58) { 
         x = 111.5;
      }
      if (x > 90 && y === 58) { 
         y = 58.5;
      }
      if (x > 90 && y < 59) { 
         interactText.style.display = "block";
         document.addEventListener("keyup", function (event) {
            if (event.keyCode === 69) {
               x = 90;
               y = 40;
               setTimeout(() => { selectedRoom = 2;});
            }
         });
      }
      //cat & sign
      if (x === 90 && y < 59 && y > 16) {
         x = 89.5
      }
      if (x === 76 && y < 36 && y > 16) {
         x = 75.5;
      }
      if (x > 76 && y === 36) {
         y = 36.5;
      }
      if (x > 76 && y === 16) {
         y = 15.5;
      }
      //rocks
      if (x === 129 && y > 80) { 
         x = 128.5;
      }
      if (x > 75 && y === 122) { 
         y = 122.5;
      }
      if (x > 75 && y === 80) { 
         y = 79.5;
      }
      if (x === 75 && y < 122 && y > 80)  {
         x = 74.5;
      }
      //tree
      if (x < 53 && y === 37) {
         y=37.5;
      }
      if (x === 53 && y < 37) {
         x = 53.5;
      }
   } 
   if (selectedRoom === 2) {
      semafoor = false;
      upstairs.style.backgroundImage = `url("img/house2.gif")`;
      interactText.style.display = "none";
      
      var leftLimit = -2;
      var rightLimit = (16 * 11) + 2;
      var topLimit = 29;
      var bottomLimit = 150;
      //kast
      if (x === 112 && y < 43) {
         x = 111.5;
      }
      if (x > 112 && x < 175 && y === 43) {
         y = 43.5;
      }
      if (x === 175 && y < 43) {
         x = 175.5;
      }
      // desktop
      if (y === 127 && x > 95 && x < 175) {
         y = 126.5;
      }
      if (y > 127 && x === 95) {
         x = 94.5;
      }
      if (y > 127 && x === 175) {
         x = 175.5;
      }
      if (y > 125 && x > 120 && x < 175) {
         interactText.style.display = "block";
         document.addEventListener("keyup", function (event) {
            if (event.keyCode === 69) {
               openAboutMe();
               x = 143;
               y = 126;
            }
         });
      }
      if (x < 9 && y === 35) {
         y = 34.5;
      }
      if (x === 9 && y > 35 && y < 90) {
         x = 9.5;
      }
      if (x < 30 && y === 88) {
         y = 87.5;
      }
      if ( x === 65 && y > 88) {
         x = 65.5;
      }
      if (x > 30 && x < 65 && y === 88) {
         y = 83.5;
      }
    
   }
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   // console.log(x, y);
   // console.log(busy);
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
   // console.log("busy");
   // console.log(busy);
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
   setTimeout(() => { selectedRoom = 2 }, 500);
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
function openAboutDaan() {
   var x = document.getElementById("aboutme");
   var welcomeSection = document.getElementById("welcomeText");
   var aboutMe = document.getElementById("aboutDaan");


   if( aboutMe.style.display === "block") {
   x.style.display = "block";
   welcomeSection.style.display = "block";
   aboutMe.style.display = "none";
   } else {
      x.style.display = "none";
      welcomeSection.style.display = "none";
      aboutMe.style.display = "block";
   }
}
function openContactDaan() {
   var x = document.getElementById("aboutme");
   var welcomeSection = document.getElementById("welcomeText");
   var contactDaan = document.getElementById("contactDaan");


   if( contactDaan.style.display === "block") {
   x.style.display = "block";
   welcomeSection.style.display = "block";
   contactDaan.style.display = "none";
   } else {
      x.style.display = "none";
      welcomeSection.style.display = "none";
      contactDaan.style.display = "block";
   }
}
const isMobile = {
   Android: function() {
       return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function() {
       return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function() {
       return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function() {
       return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function() {
       return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
   },
   any: function() {
       return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};

window.addEventListener("load", function () {
   if( isMobile.any() ) {
      loader.textContent = "this website is optimized for desktop usage :(";
   } else {
      setTimeout(function () {
         loader.style.display = "none";
      }, 1000)   
   }
});