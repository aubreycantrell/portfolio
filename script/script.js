/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});

document.addEventListener("DOMContentLoaded", function () {
  const columns = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  columns.forEach(column => {
    observer.observe(column);
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const imageSection = document.getElementById("imageSection");
    const images = imageSection.querySelectorAll(".imageWrapper");
    
    // Initialize positions and velocities for each image
    const imageProps = Array.from(images).map((img, index) => {
        return {
            element: img,
            posX: index * 120, // Starting position
            speedX: 2 + Math.random() * 3 // Random speed between 2 and 5
        };
    });

    function animate() {
        imageProps.forEach((imgProp, index) => {
            // Update position
            imgProp.posX += imgProp.speedX;
            
            // Check for wall collisions
            if (imgProp.posX <= 0 || imgProp.posX + imgProp.element.offsetWidth >= imageSection.offsetWidth) {
                imgProp.speedX *= -1;
            }
            
            // Check for collisions with other images
            imageProps.forEach((otherImgProp, otherIndex) => {
                if (index !== otherIndex && checkCollision(imgProp, otherImgProp)) {
                    // Swap speeds for bounce effect
                    const tempSpeed = imgProp.speedX;
                    imgProp.speedX = otherImgProp.speedX;
                    otherImgProp.speedX = tempSpeed;
                }
            });
            
            // Apply updated position
            imgProp.element.style.left = imgProp.posX + "px";
        });

        requestAnimationFrame(animate);
    }

    function checkCollision(img1, img2) {
        const rect1 = img1.element.getBoundingClientRect();
        const rect2 = img2.element.getBoundingClientRect();
        
        return (
            rect1.right >= rect2.left &&
            rect1.left <= rect2.right &&
            rect1.bottom >= rect2.top &&
            rect1.top <= rect2.bottom
        );
    }

    animate();
});


document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".slide-in-element-left").classList.add("slide-in");
});
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".slide-in-element-right").classList.add("slide-in");
});
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".slide-in-element-left").classList.add("slide-in");
});

const imageContainer = document.querySelector('.image-container');
const warpedImage = document.querySelector('.warped-image');

let isDragging = false;
let startX, startY, initialX, initialY;

function onMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = warpedImage.offsetLeft;
    initialY = warpedImage.offsetTop;
}

function onMouseMove(e) {
    if (!isDragging) return;

    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    let warpX = (dx / imageContainer.offsetWidth) * 50;
    let warpY = (dy / imageContainer.offsetHeight) * 50;

    warpedImage.style.transform = `translate(${initialX + dx}px, ${initialY + dy}px) scale(${1 + Math.abs(warpX / 100)}, ${1 + Math.abs(warpY / 100)}) rotate(${warpX}deg)`;
    warpedImage.style.filter = `blur(${Math.abs(warpX / 10)}px)`;
}

function onMouseUp() {
    isDragging = false;
    warpedImage.style.transform = `translate(0, 0) scale(1) rotate(0deg)`;
}


const container = document.getElementById('threejs-container');

document.addEventListener("DOMContentLoaded", function () {
  const columns = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  columns.forEach(column => {
    observer.observe(column);
  });

  // New code for random animation delay
  const levitatingItems = document.querySelectorAll('.levitating');

  levitatingItems.forEach(item => {
    const randomDelay = Math.random() * 1.6;
    item.style.setProperty('--random-delay', randomDelay);
  });
});

   document.addEventListener("DOMContentLoaded", () => {
        const cranes = document.querySelectorAll(".imageSection2 img");
        const sections = document.querySelectorAll("#homepage-show .cont");

        // Function to show the correct section
        const showSection = (dataPoint) => {
            sections.forEach((section) => {
                if (section.dataset.point === dataPoint) {
                    section.classList.remove("homepage-hide");
                } else {
                    section.classList.add("homepage-hide");
                }
            });
        };

        // Add click event listeners to each crane
        cranes.forEach((crane) => {
            crane.addEventListener("click", () => {
                const dataPoint = crane.dataset.point;

                // Log crane id and data-point
                console.log("Crane clicked:", crane.id);
                console.log("Data point:", dataPoint);

                // Toggle data-selected attribute and class
                cranes.forEach((c) => {
                    if (c === crane) {
                        c.dataset.selected = "yes";
                        c.classList.add("selected");
                    } else {
                        c.dataset.selected = "no";
                        c.classList.remove("selected");
                    }
                });

                showSection(dataPoint);
            });
        });
    });

const fonts = [
  'Arial, sans-serif',
  'Georgia, serif',
  'Courier New, monospace',
  'Times New Roman, serif',
  'Comic Sans MS, cursive',
  'Verdana, sans-serif',
  'Trebuchet MS, sans-serif',
  'Impact, sans-serif'
];

const textElement = document.getElementById('dynamicText');
const text = textElement.textContent;

// Wrap each letter in a span
textElement.innerHTML = text.split('').map(letter => `<span>${letter}</span>`).join('');

const spans = textElement.querySelectorAll('span');

function randomFontChange() {
  spans.forEach(span => {
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    span.style.fontFamily = randomFont;
  });
}

setInterval(randomFontChange, 500); // Change font every 0.5 seconds
