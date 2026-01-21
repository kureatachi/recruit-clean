// Center carousel functionality
var centerCarouselIndex = 0;
var centerCarouselItems = [];

function initCenterCarousel() {
  centerCarouselItems = Array.from(document.querySelectorAll('.center-carousel-item'));
  updateCenterCarousel();
}

function moveCenterCarousel(direction) {
  if (!centerCarouselItems.length) return;
  var total = centerCarouselItems.length;
  centerCarouselIndex = (centerCarouselIndex + direction + total) % total;
  updateCenterCarousel();
}

function updateCenterCarousel() {
  var total = centerCarouselItems.length;
  var baseOffset = 380; // horizontal spacing between cards

  centerCarouselItems.forEach(function(item, index) {
    var pos = index - centerCarouselIndex;
    if (pos > total / 2) pos -= total;
    if (pos < -total / 2) pos += total;

    var translateX = pos * baseOffset;
    var scale = pos === 0 ? 1 : 0.82;
    var opacity = pos === 0 ? 1 : (Math.abs(pos) === 1 ? 0.7 : 0);
    var z = pos === 0 ? 3 : (Math.abs(pos) === 1 ? 2 : 1);

    item.style.transform = 'translate(-50%, 0) translateX(' + translateX + 'px) scale(' + scale + ')';
    item.style.opacity = opacity;
    item.style.zIndex = z;
    item.style.pointerEvents = pos === 0 ? 'auto' : 'none';
    
    // Add click handler for center card
    if (pos === 0) {
      item.style.cursor = 'pointer';
      item.onclick = function(e) {
        // Only navigate if clicking on the card itself, not on buttons
        if (e.target.closest('.center-carousel-btn')) {
          return;
        }
        // Determine which card is centered and link accordingly
        var img = item.querySelector('img');
        if (img) {
          var imgSrc = img.getAttribute('src');
          if (imgSrc && imgSrc.includes('card-1.png')) {
            window.location.href = 'interviewNK.html';
          } else if (imgSrc && imgSrc.includes('card-2.png')) {
            window.location.href = 'interviewRY.html';
          } else if (imgSrc && imgSrc.includes('card-3.png')) {
            window.location.href = 'interviewYO.html';
          } else if (imgSrc && imgSrc.includes('card-4.png')) {
            window.location.href = 'interviewHS.html';
          }
        }
      };
    } else {
      item.style.cursor = 'default';
      item.onclick = null;
    }
  });
  
  updateCenterDots();
}

function goToCenterCarousel(index) {
  centerCarouselIndex = index;
  updateCenterCarousel();
}

function updateCenterDots() {
  var dots = document.querySelectorAll('.center-dot');
  dots.forEach(function(dot, index) {
    if (index === centerCarouselIndex) {
      dot.classList.add('active');
      dot.style.background = '#333';
    } else {
      dot.classList.remove('active');
      dot.style.background = '#ddd';
    }
  });
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCenterCarousel);
} else {
  initCenterCarousel();
}
