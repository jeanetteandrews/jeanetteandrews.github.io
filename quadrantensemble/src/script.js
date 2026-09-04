let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const videos = document.querySelectorAll('.slide video');

function showSlide(n) {
    // Pause all videos
    videos.forEach(video => video.pause());
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Wrap around
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Play current video
    videos[currentSlide].play();
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Start first video
videos[0].play();