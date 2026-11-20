const startSlider = () => {

    const slides = document.querySelectorAll(".slider .slide");
  
    if (slides.length < 2) return;
  
    let currentSlide = 0;
  
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === 0);
    });
  
    setInterval(() => {
  
        slides[currentSlide].classList.remove("active");
  
        currentSlide = (currentSlide + 1) % slides.length;
  
        slides[currentSlide].classList.add("active");
  
    }, 2000);
  };
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSlider);
  } else {
    startSlider();
  }