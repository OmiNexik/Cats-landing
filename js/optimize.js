document.addEventListener('DOMContentLoaded', function() {
  function getImageSize() {
    const width = window.innerWidth;
    if (width < 768) return 'small';
    if (width < 1200) return 'medium';
    return 'large';
  }

  function loadOptimizedImages() {
    const size = getImageSize();
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      if (!img.dataset.loaded) {
        const originalSrc = img.getAttribute('data-src');
        const sizePath = originalSrc.replace(/\.(jpg|png|avif)$/, `-${size}.$1`);
        
        if (img.src !== sizePath) {
          img.src = sizePath;
          img.dataset.loaded = 'true';
        }
      }
    });
  }

  loadOptimizedImages();
  
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(loadOptimizedImages, 300);
  });
  
  function lazyLoadScripts() {
    const scripts = [
      { src: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js', defer: true },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js', defer: true },
      { src: 'js/main.js', defer: true }
    ];
    
    setTimeout(function() {
      scripts.forEach(script => {
        const scriptEl = document.createElement('script');
        scriptEl.src = script.src;
        if (script.defer) scriptEl.defer = true;
        document.body.appendChild(scriptEl);
      });
    }, 2000);
  }
  
  if (window.requestIdleCallback) {
    requestIdleCallback(lazyLoadScripts);
  } else {
    setTimeout(lazyLoadScripts, 2000);
  }
});
