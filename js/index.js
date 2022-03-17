var character = document.querySelector(".character");
var map = document.querySelector(".map");

var data = false;
var text = '';
var i = 0;
var typingSpeed = 50;

//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

hideData();

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
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = -8 + 12;
   var bottomLimit = (16 * 8 - 2);
   var deskLimit = 120
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; } 
   // bed
   if (x === 120 && y < 34) {
        x = 119;
    }
    if (x > 120 && x < 154 && y === 33) {
        y = 34;
    }
    if (x === 155 && y < 34) {
        x = 156; 
    } 
    //desk
    if (x === 22 && y === 4) {
        x = 23; 
    } 
    if (x < 22 && y < 15) {
        y = 15;
        showData();
    }
    if (x > 22 || y > 15) {
        hideData();
    }
    //tables left
    if (x < 4 && y === 29) {
        y = 28;
    }
    if (x === 4 && y > 31 && y < 80) {
        x = 5;
    }
    if (x < 4 && y === 80) {
        y = 81;
    }
    //tables right
    if (x > 174 && y === 47) {
        y = 46;
    }
    if (x > 169 && y > 49 && y < 117) {
        x = 169;
    }
    if (x > 174 && y === 117) {
        y = 118;
    }
    //plant bottom
    if (x === -8 && y > 98) {
        y = 98;
    }
    if (x < 8 && y > 98) {
        x = 8
    }
    // plant top right
    if (x > 159 && x < 175 && y < 18) {
        x = 159;
    }
    if (x > 159 && x < 175 && y === 19) {
        y = 20;
    }
    if (x === 179 && y < 18) {
        x = 180; 
    } 
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

var newerText = "";
var index = 0;
var buttonText = "";


function hideData() {
    var x = document.getElementById("data");
    x.style.display = "none";
    i = 0;
    text = "";
    document.getElementById("selectText").innerHTML = '';
    document.getElementById("text").innerHTML = text;
} 
function showData() {
    index = 0;
    var x = document.getElementById("data");
    if (x.style.display === "none") {
        x.style.display = "block";
        textData();
    }
}

function newText(newerText) {
    i = 0
    text = "";
    document.getElementById("text").innerHTML = text;
    text = newerText
    typeWriter();
}
function textData() {
    text = 'Hello, my name is Daan';
    typeWriter();
}
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        index += 1;
        nextSlide();
        console.log(index);
    }
});
function typeWriter() {
  if (i < text.length) {
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, typingSpeed);
  }
}
function addOneToIndex() {
    if (index < 3) {
        index += 1;
        nextSlide();
    }
}
function removeOneFromIndex() {
    if (index > 0) {
        index -= 1;
    }
    nextSlide();
}
function nextSlide() {
    if (index === 0) {
        newerText = 'Hello, my name is Daan';
    }
    if (index === 1) {
        newerText = "welcome to my website";
    } else  if (index === 2) {
        newerText = "what would you like to know?";
        document.getElementById("selectText").innerHTML = '';
    } else  if (index === 3) {
        newerText = "";
        buttonText = `<button onclick='aboutMe()'>About Me</a> &nbsp; <button onclick='myWork()'>My Work</a> &nbsp; <button onclick='contactMe()'>Contact Me</a>`;
        document.getElementById("selectText").innerHTML = buttonText;
    }
    newText(newerText);
}
function aboutMe() {
    index += 1;
    text = "coming soon";
    newText(text);
    document.getElementById("selectText").innerHTML = '';
}
function myWork() {
    index += 1;
    text = "coming soon";
    newText(text);
    document.getElementById("selectText").innerHTML = '';
}
function contactMe() {
    index += 1;
    text = "coming soon";
    newText(text);
    document.getElementById("selectText").innerHTML = '';
}



