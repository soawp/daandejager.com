let sun = document.getElementById('sun');
let clouds = document.getElementById('clouds');
let mount_back = document.getElementById('mount_back');
let mount_front = document.getElementById('mount_front');
let trees = document.getElementById('trees');
let bushes = document.getElementById('bushes');
let ground = document.getElementById('ground');
let birds = document.getElementById('birds');
let foliage = document.getElementById('foliage');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let about = document.getElementById('about');
let test = document.getElementById('test');
let scrollIndicator = document.getElementById('scroll-down');
let bg_uw = document.getElementById('bg_uw');
let cave1 = document.getElementById('cave1');
let person = document.getElementById('person');
let light = document.getElementById('light');
let koi = document.getElementById('koi');
let breakpoint = '';



window.addEventListener('scroll', function() {
    let value = window.scrollY;
    birds.style.left = value + 'px';
    sun.style.top = value * 1.5 + 'px';
    clouds.style.top = value * 1 + 'px';
    mount_back.style.top = value * 0.9 + 'px';
    mount_front.style.top = value * 0.8 + 'px';
    trees.style.top = value * 0.6 + 'px';
    bushes.style.top = value * 0.4 + 'px';
    ground.style.top = value * 0.2 + 'px';
    foliage.style.top = value * 0.1 + 'px';
    text.style.marginRight = value * 2 + 'px';
    scrollIndicator.style.opacity = 100 - (value / 4) + '%';
    if (isInViewport(bg_uw)) {
        value -= 2750;
        person.style.top = value / 50 + 'vh';
        cave1.style.marginLeft = value * .009 + 'vh';
        koi.style.top = value * .01 + 'vh';
        light.style.top = value * .005 + 'vh';
    }
    
})

function isInViewport(element) {
	var position = element.getBoundingClientRect();

	// checking for partial visibility
	if(position.top < window.innerHeight && position.bottom >= 0) {
		return true;
	} else {
        return false;
    }
    
};