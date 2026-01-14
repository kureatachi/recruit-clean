// Consolidated header navigation functionality
// Handles hamburger menu toggle, desktop dropdown, and mobile accordion

(function() {
  'use strict';

  let hamburgerMenuSetup = false;
  let desktopDropdownSetup = false;

  // Hamburger menu toggle functionality
  function setupHamburgerMenu() {
    // Prevent duplicate handlers
    if (hamburgerMenuSetup) return;
    
    // Use jQuery if available, otherwise use vanilla JS
    if (typeof jQuery !== 'undefined') {
      jQuery(function($) {
        $('.menu-under').off('click').on('click', function() {
          $('.menu__line').toggleClass('active');
          $('.nav-cover').fadeToggle();
        });
        hamburgerMenuSetup = true;
      });
    } else {
      // Fallback vanilla JS implementation
      const menuButton = document.querySelector('.menu-under');
      const menuLines = document.querySelectorAll('.menu__line');
      const navCover = document.querySelector('.nav-cover');
      
      if (menuButton && navCover && !hamburgerMenuSetup) {
        menuButton.addEventListener('click', function() {
          // Toggle active class on menu lines
          menuLines.forEach(function(line) {
            line.classList.toggle('active');
          });
          
          // Toggle nav-cover visibility
          const isVisible = navCover.style.display !== 'none' && 
                           window.getComputedStyle(navCover).display !== 'none';
          navCover.style.display = isVisible ? 'none' : 'block';
        });
        hamburgerMenuSetup = true;
      }
    }
  }

  // Setup hamburger menu accordion (mobile only)
  function setupMobileAccordion() {
    if (window.innerWidth <= 1100) {
      const toggleLinks = document.querySelectorAll('.nav-cover__menu__toggle');
      
      toggleLinks.forEach(function(toggle) {
        if (toggle.dataset.accordionSetup === 'true') return;
        toggle.dataset.accordionSetup = 'true';
        
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const parentItem = this.closest('.nav-cover__menu__item--has-dropdown');
          if (!parentItem) return;
          
          const isActive = parentItem.classList.contains('active');
          
          // Close all other dropdowns
          document.querySelectorAll('.nav-cover__menu__item--has-dropdown').forEach(function(item) {
            item.classList.remove('active');
          });
          
          // Toggle current dropdown
          if (!isActive) {
            parentItem.classList.add('active');
          }
        });
      });
    }
  }
  
  // Setup desktop dropdown menu
  function setupDesktopDropdown() {
    if (window.innerWidth > 1100) {
      const dropdownItems = document.querySelectorAll('.nav-item-has-dropdown');
      
      dropdownItems.forEach(function(item) {
        const toggle = item.querySelector('.nav-toggle');
        const dropdown = item.querySelector('.nav-dropdown');
        
        if (!toggle || !dropdown) return;
        
        // Skip if already setup
        if (toggle.dataset.dropdownSetup === 'true') return;
        toggle.dataset.dropdownSetup = 'true';
        
        // Click to toggle (for accessibility)
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          const isVisible = dropdown.style.display === 'block';
          
          // Close all dropdowns
          document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
            dd.style.display = 'none';
          });
          
          // Toggle current dropdown
          if (!isVisible) {
            dropdown.style.display = 'block';
          }
        });
      });
      
      // Close dropdown when clicking outside (attach once)
      if (!desktopDropdownSetup) {
        document.addEventListener('click', function(e) {
          dropdownItems.forEach(function(item) {
            const dropdown = item.querySelector('.nav-dropdown');
            if (dropdown && !item.contains(e.target)) {
              dropdown.style.display = 'none';
            }
          });
        });
        desktopDropdownSetup = true;
      }
    }
  }
  
  // Initialize functions
  function initNavigation() {
    setupHamburgerMenu();
    setupMobileAccordion();
    setupDesktopDropdown();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
  
  // Re-setup when window resizes (but don't re-setup hamburger menu)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Reset accordion and dropdown setup flags on resize
      document.querySelectorAll('.nav-cover__menu__toggle').forEach(function(toggle) {
        toggle.dataset.accordionSetup = 'false';
      });
      document.querySelectorAll('.nav-toggle').forEach(function(toggle) {
        toggle.dataset.dropdownSetup = 'false';
      });
      desktopDropdownSetup = false;
      setupMobileAccordion();
      setupDesktopDropdown();
    }, 250);
  });
  
  // Re-setup hamburger menu accordion when menu opens (jQuery fadeToggle)
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function($) {
      const navCover = document.querySelector('.nav-cover');
      if (navCover) {
        const observer = new MutationObserver(function() {
          const isVisible = navCover.style.display !== 'none' && 
                           window.getComputedStyle(navCover).display !== 'none';
          if (isVisible) {
            setTimeout(setupMobileAccordion, 100);
          }
        });
        
        observer.observe(navCover, {
          attributes: true,
          attributeFilter: ['style'],
          childList: false,
          subtree: false
        });
      }
    });
  }
})();
