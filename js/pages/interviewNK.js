// カルーセル機能
var carouselPositions = {
  'interview-carousel': 0
};

function moveCarousel(carouselId, direction) {
  var carousel = document.getElementById(carouselId);
  var wrapper = carousel.querySelector('.carousel-wrapper');
  var items = wrapper.querySelectorAll('.carousel-item');
  var totalItems = items.length;
  
  carouselPositions[carouselId] += direction;
  
  if (carouselPositions[carouselId] < 0) {
    carouselPositions[carouselId] = totalItems - 1;
  } else if (carouselPositions[carouselId] >= totalItems) {
    carouselPositions[carouselId] = 0;
  }
  
  var translateX = -carouselPositions[carouselId] * 100;
  wrapper.style.transform = 'translateX(' + translateX + '%)';
  
  updateDots(carouselId);
}

function goToSlide(carouselId, index) {
  carouselPositions[carouselId] = index;
  var carousel = document.getElementById(carouselId);
  var wrapper = carousel.querySelector('.carousel-wrapper');
  var translateX = -index * 100;
  wrapper.style.transform = 'translateX(' + translateX + '%)';
  
  updateDots(carouselId);
}

function updateDots(carouselId) {
  var dots = document.querySelectorAll('.carousel-dots .dot');
  var currentIndex = carouselPositions[carouselId];
  
  dots.forEach(function(dot, index) {
    if (index === currentIndex) {
      dot.classList.add('active');
      dot.style.background = '#333';
    } else {
      dot.classList.remove('active');
      dot.style.background = '#ddd';
    }
  });
}

// Center-focused 3-card carousel (infinite loop)
// Start with index 1 to show card1 (middle) in center for PC
var centerCarouselIndex = 1;
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

// Reorder carousel items for SP: card1, card2, card3
var carouselReordered = false;
function reorderCarouselForSP() {
  if (window.innerWidth <= 750 && !carouselReordered) {
    var track = document.querySelector('.center-carousel-track');
    if (track) {
      var items = Array.from(track.querySelectorAll('.center-carousel-item'));
      if (items.length === 3) {
        // Current order: card2 (items[0]), card1 (items[1]), card3 (items[2])
        // Desired order: card1, card2, card3
        // Move card1 (items[1]) to first position
        track.insertBefore(items[1], items[0]);
        // Now order: card1, card2, card3 (card2 moved to second, card3 stays third)
        carouselReordered = true;
        // Reset carousel index to 0 since card1 is now first
        centerCarouselIndex = 0;
      }
    }
  } else if (window.innerWidth > 750) {
    carouselReordered = false;
  }
}

// Initialize carousel - handle both deferred and immediate execution
(function() {
  function init() {
    reorderCarouselForSP();
    initCenterCarousel();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded (script with defer)
    init();
  }
  
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 750) {
      reorderCarouselForSP();
      initCenterCarousel();
    }
  });
})();

(function() {
  function adjustLeaderSection() {
    if (window.innerWidth <= 768) {
      const leaderOverlay = document.querySelector('#interview-section-3 .leader-overlay');
      const leaderImage = document.querySelector('#interview-section-3 .leader-image');
      const leaderTitle = document.querySelector('#interview-section-3 .leader-overlay h2');
      
      if (leaderOverlay) {
        // Get current style attribute and modify it
        let styleAttr = leaderOverlay.getAttribute('style') || '';
        // Remove padding from style attribute
        styleAttr = styleAttr.replace(/padding\s*:\s*[^;]+;?/gi, '');
        styleAttr = styleAttr.replace(/padding-[a-z]+\s*:\s*[^;]+;?/gi, '');
        // Add new padding values
        styleAttr += ' padding-top: 30px !important; padding-bottom: 30px !important; padding-left: 20px !important; padding-right: 20px !important;';
        leaderOverlay.setAttribute('style', styleAttr);
        
        // Also set via style object as backup
        leaderOverlay.style.removeProperty('padding');
        leaderOverlay.style.setProperty('padding-top', '30px', 'important');
        leaderOverlay.style.setProperty('padding-bottom', '30px', 'important');
        leaderOverlay.style.setProperty('padding-left', '20px', 'important');
        leaderOverlay.style.setProperty('padding-right', '20px', 'important');
      }
      
      // Hide the h2 title in leader-overlay at 768px and below
      if (leaderTitle) {
        leaderTitle.style.setProperty('display', 'none', 'important');
        leaderTitle.style.setProperty('visibility', 'hidden', 'important');
        leaderTitle.style.setProperty('opacity', '0', 'important');
        leaderTitle.style.setProperty('height', '0', 'important');
        leaderTitle.style.setProperty('margin', '0', 'important');
        leaderTitle.style.setProperty('padding', '0', 'important');
      }
      
      if (leaderImage) {
        // Set image container padding to match text
        leaderImage.style.setProperty('padding-left', '20px', 'important');
        leaderImage.style.setProperty('padding-right', '20px', 'important');
      }
    } else {
      // Show the h2 title above 768px
      const leaderTitle = document.querySelector('#interview-section-3 .leader-overlay h2');
      if (leaderTitle) {
        leaderTitle.style.removeProperty('display');
        leaderTitle.style.removeProperty('visibility');
        leaderTitle.style.removeProperty('opacity');
        leaderTitle.style.removeProperty('height');
      }
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustLeaderSection);
  } else {
    adjustLeaderSection();
  }
  
  // Run multiple times to ensure it applies
  setTimeout(adjustLeaderSection, 100);
  setTimeout(adjustLeaderSection, 300);
  setTimeout(adjustLeaderSection, 500);
  
  window.addEventListener('resize', adjustLeaderSection);
})();
(function() {
  function applyResponsiveFontSizing() {
    const width = window.innerWidth;
    
    // Get all title elements
    const allTitles = document.querySelectorAll('.title-border .title, h2.title, .title-border h2.title, #interview-section-4 .title-border .title, #interview-section-4 .title-border h2.title, #interview-section-4 h2.title, #interview-section-5 .title-border .title, #interview-section-5 .title-border h2.title, #interview-section-5 h2.title, #interview-section-2 .title-border .title, #interview-section-2 .title-border h2.title, #interview-section-2 h2.title, .white-text-card h2, .leader-overlay h2, #interview-section .white-text-card h2, #interview-section-3 .leader-overlay h2');
    
    // Only apply below 768px - set to 16px
    if (width <= 768) {
      // Apply to white-text-card h2 - use multiple selectors to ensure we catch it
      const whiteCardTitle = document.querySelector('#interview-section .white-text-card h2') || 
                              document.querySelector('.white-text-card h2');
      if (whiteCardTitle) {
        whiteCardTitle.style.setProperty('font-size', '16px', 'important');
      }
      
      // Apply to leader-overlay h2 - use specific selector
      const leaderTitle = document.querySelector('#interview-section-3 .leader-overlay h2') || 
                          document.querySelector('.leader-overlay h2');
      if (leaderTitle) {
        leaderTitle.style.setProperty('font-size', '16px', 'important');
      }
      
      // Also apply to mobile title bar h2 elements
      const mobileInterviewTitle = document.querySelector('.mobile-title-bar.interview-mobile-title h2');
      if (mobileInterviewTitle) {
        mobileInterviewTitle.style.setProperty('font-size', '16px', 'important');
      }
      
      const mobileLeaderTitle = document.querySelector('.mobile-title-bar.leader-mobile-title h2');
      if (mobileLeaderTitle) {
        mobileLeaderTitle.style.setProperty('font-size', '16px', 'important');
      }
      
      // Set all other titles to 16px
      allTitles.forEach(function(title) {
        // Skip card titles as they're handled above
        if (!title.closest('.white-text-card') && !title.closest('.leader-overlay')) {
          title.style.setProperty('font-size', '16px', 'important');
        }
      });
    } else if (width > 768) {
      // Above 768px, explicitly set ALL titles to 22px
      const whiteCardTitle = document.querySelector('#interview-section .white-text-card h2') || 
                              document.querySelector('.white-text-card h2');
      if (whiteCardTitle) {
        whiteCardTitle.style.setProperty('font-size', '22px', 'important');
      }
      
      const leaderTitle = document.querySelector('#interview-section-3 .leader-overlay h2') || 
                          document.querySelector('.leader-overlay h2');
      if (leaderTitle) {
        leaderTitle.style.setProperty('font-size', '22px', 'important');
      }
      
      // Reset ALL other titles to 22px
      allTitles.forEach(function(title) {
        // Skip card titles as they're handled above
        if (!title.closest('.white-text-card') && !title.closest('.leader-overlay')) {
          title.style.setProperty('font-size', '22px', 'important');
        }
      });
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyResponsiveFontSizing);
  } else {
    applyResponsiveFontSizing();
  }
  
  // Run on resize
  window.addEventListener('resize', applyResponsiveFontSizing);
  
  // Run multiple times to ensure it applies
  setTimeout(applyResponsiveFontSizing, 100);
  setTimeout(applyResponsiveFontSizing, 300);
  setTimeout(applyResponsiveFontSizing, 500);
  setTimeout(applyResponsiveFontSizing, 1000);
  
  // Also run on load to ensure it applies after all CSS loads
  window.addEventListener('load', applyResponsiveFontSizing);
})();
(function() {
  function adjustSkillCard() {
    if (window.innerWidth <= 750) {
      const skillCard = document.querySelector('#skill-section .welfare-content > div[style*="background: #FFE680"]');
      
      if (skillCard) {
        // Get current style attribute and modify it
        let styleAttr = skillCard.getAttribute('style') || '';
        // Remove padding from style attribute
        styleAttr = styleAttr.replace(/padding\s*:\s*[^;]+;?/gi, '');
        styleAttr = styleAttr.replace(/padding-[a-z]+\s*:\s*[^;]+;?/gi, '');
        // Add new padding values
        styleAttr += ' padding-top: 120px !important; padding-bottom: 120px !important; padding-left: 40px !important; padding-right: 40px !important;';
        skillCard.setAttribute('style', styleAttr);
        
        // Also set via style object as backup
        skillCard.style.removeProperty('padding');
        skillCard.style.setProperty('padding-top', '120px', 'important');
        skillCard.style.setProperty('padding-bottom', '120px', 'important');
        skillCard.style.setProperty('padding-left', '40px', 'important');
        skillCard.style.setProperty('padding-right', '40px', 'important');
      }
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustSkillCard);
  } else {
    adjustSkillCard();
  }
  
  // Run multiple times to ensure it applies
  setTimeout(adjustSkillCard, 100);
  setTimeout(adjustSkillCard, 300);
  setTimeout(adjustSkillCard, 500);
  
  window.addEventListener('resize', adjustSkillCard);
})();
(function() {
  function adjustSkillCardDesktop() {
    if (window.innerWidth > 768) {
      const skillCardContainer = document.querySelector('#interview-section-5 .skill-card-container');
      if (skillCardContainer) {
        // Directly modify the style attribute to override inline styles
        let currentStyle = skillCardContainer.getAttribute('style') || '';
        // Remove existing margin-top and margin-bottom
        currentStyle = currentStyle.replace(/margin-top\s*:\s*[^;]+;?/gi, '');
        currentStyle = currentStyle.replace(/margin-bottom\s*:\s*[^;]+;?/gi, '');
        // Add new margins
        currentStyle += ' margin-top: 100px !important; margin-bottom: 100px !important;';
        skillCardContainer.setAttribute('style', currentStyle);
        // Also set via style object
        skillCardContainer.style.marginTop = '100px';
        skillCardContainer.style.marginBottom = '100px';
      }
    } else {
      // Reset to original on mobile
      const skillCardContainer = document.querySelector('#interview-section-5 .skill-card-container');
      if (skillCardContainer) {
        let currentStyle = skillCardContainer.getAttribute('style') || '';
        currentStyle = currentStyle.replace(/margin-top\s*:\s*[^;]+;?/gi, '');
        currentStyle = currentStyle.replace(/margin-bottom\s*:\s*[^;]+;?/gi, '');
        currentStyle += ' margin-top: 50px; margin-bottom: 80px;';
        skillCardContainer.setAttribute('style', currentStyle);
      }
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustSkillCardDesktop);
  } else {
    adjustSkillCardDesktop();
  }
  
  // Run multiple times to ensure it applies
  setTimeout(adjustSkillCardDesktop, 100);
  setTimeout(adjustSkillCardDesktop, 300);
  setTimeout(adjustSkillCardDesktop, 500);
  setTimeout(adjustSkillCardDesktop, 1000);
  
  window.addEventListener('resize', adjustSkillCardDesktop);
})();
(function() {
  function adjustTitleFontSizes() {
    if (window.innerWidth <= 750) {
      const changeTitle = document.querySelector('#interview-section-4 .title-border .title');
      const messageTitle = document.querySelector('#interview-section-5 .title-border .title');
      const interviewSection2Title = document.querySelector('#interview-section-2 .title-border .title');
      
      if (changeTitle) {
        // Override inline font-size
        changeTitle.style.setProperty('font-size', '16px', 'important');
      }
      
      if (interviewSection2Title) {
        // Override inline font-size for "売る"のではなく、"寄り添う"営業を。
        interviewSection2Title.style.setProperty('font-size', '16px', 'important');
      }
      
      if (messageTitle) {
        // Override inline font-size
        messageTitle.style.setProperty('font-size', '16px', 'important');
      }
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustTitleFontSizes);
  } else {
    adjustTitleFontSizes();
  }
  
  // Run multiple times to ensure it applies
  setTimeout(adjustTitleFontSizes, 100);
  setTimeout(adjustTitleFontSizes, 300);
  setTimeout(adjustTitleFontSizes, 500);
  
  window.addEventListener('resize', adjustTitleFontSizes);
})();
// Fix section-1 anchor link - handle both mobile and desktop
(function() {
  function handleSection1Link() {
    // Find all links pointing to #section-1
    const section1Links = document.querySelectorAll('a[href="#section-1"]');
    
    section1Links.forEach(function(link) {
      // Remove existing listeners to avoid duplicates
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // On mobile, scroll to mobile title; on desktop, scroll to desktop title
        if (window.innerWidth <= 768) {
          const mobileTitle = document.querySelector('.section-1-mobile-title');
          if (mobileTitle) {
            mobileTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        
        // Desktop: find the desktop version
        const section1Title = document.querySelector('#section-1');
        if (section1Title) {
          // For absolutely positioned elements, we need to scroll to the parent section
          const parentSection = section1Title.closest('#interview-section');
          if (parentSection) {
            parentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Then scroll a bit more to account for the absolute positioning
            setTimeout(function() {
              window.scrollBy(0, -100); // Adjust offset as needed
            }, 100);
          } else {
            section1Title.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleSection1Link);
  } else {
    handleSection1Link();
  }
  
  // Re-run on window resize
  let resizeTimer1;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer1);
    resizeTimer1 = setTimeout(handleSection1Link, 250);
  });
  
  // Also handle direct hash navigation (when page loads with #section-1)
  function handleHashNavigation1() {
    const hash = window.location.hash;
    if (hash === '#section-1') {
      setTimeout(function() {
        // On mobile, scroll to mobile title; on desktop, scroll to desktop title
        if (window.innerWidth <= 768) {
          const mobileTitle = document.querySelector('.section-1-mobile-title');
          if (mobileTitle) {
            mobileTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        
        // Desktop: find the desktop version
        const section1Title = document.querySelector('#section-1');
        if (section1Title) {
          const parentSection = section1Title.closest('#interview-section');
          if (parentSection) {
            parentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(function() {
              window.scrollBy(0, -100);
            }, 100);
          } else {
            section1Title.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  }
  
  // Only run hash navigation if there's a hash in the URL
  if (window.location.hash === '#section-1') {
    handleHashNavigation1();
  }
  
  // Also listen for hash changes
  window.addEventListener('hashchange', handleHashNavigation1);
})();
// Fix section-3 anchor link on mobile - redirect to mobile title
(function() {
  function handleSection3Link() {
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      // Find all links pointing to #section-3
      const section3Links = document.querySelectorAll('a[href="#section-3"]');
      
      section3Links.forEach(function(link) {
        // Remove existing listeners to avoid duplicates
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
          e.preventDefault();
          
          // On mobile, scroll to mobile title; on desktop, scroll to desktop title
          if (window.innerWidth <= 768) {
            const mobileTitle = document.querySelector('.section-3-mobile-title');
            if (mobileTitle) {
              mobileTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
              return;
            }
          }
          
          // Desktop or fallback: find the desktop version
          const section3Title = document.querySelector('#section-3');
          if (section3Title) {
            section3Title.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleSection3Link);
  } else {
    handleSection3Link();
  }
  
  // Re-run on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleSection3Link, 250);
  });
  
  // Also handle direct hash navigation (when page loads with #section-3)
  function handleHashNavigation() {
    // Only run if there's actually a hash in the URL
    const hash = window.location.hash;
    if (hash === '#section-3') {
      setTimeout(function() {
        // On mobile, scroll to mobile title; on desktop, scroll to desktop title
        if (window.innerWidth <= 768) {
          const mobileTitle = document.querySelector('.section-3-mobile-title');
          if (mobileTitle) {
            mobileTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        
        // Desktop or fallback: find the desktop version
        const section3Title = document.querySelector('#section-3');
        if (section3Title) {
          section3Title.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }
  
  // Only run hash navigation if there's a hash in the URL
  if (window.location.hash) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleHashNavigation);
    } else {
      handleHashNavigation();
    }
  }
  
  // Only listen for hash changes (not initial load without hash)
  window.addEventListener('hashchange', handleHashNavigation);
})();
