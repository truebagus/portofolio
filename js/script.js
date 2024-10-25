document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');


  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

 // Particle.js initialization dengan efek yang lebih menarik
particlesJS('particles-js', {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
      },
      shape: {
        type: ['circle', 'triangle', 'polygon'],
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 6
        }
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 3,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#45B7D1',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'bounce',
        bounce: true,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: ['grab', 'bubble']
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: {
            opacity: 0.7
          }
        },
        bubble: {
          distance: 250,
          size: 6,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });

});

document.addEventListener('DOMContentLoaded', function() {
    const modalCard = document.querySelector('.modal-card');
    let isModalVisible = false;
    let isScrolling = false;

    function resetModalScroll() {
        modalCard.scrollTop = 0;
    }

    function closeModal() {
        modalCard.classList.remove('visible');
        isModalVisible = false;
        setTimeout(resetModalScroll, 500);
        document.body.style.overflow = '';
    }

    function openModal() {
        modalCard.classList.add('visible');
        resetModalScroll();
        isModalVisible = true;
        document.body.style.overflow = 'hidden';
    }

    let lastScrollTime = Date.now();
    const scrollCooldown = 500; // ms

    // Menambahkan event listener untuk tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalVisible) {
            closeModal();
        }
    });

    window.addEventListener('wheel', function(e) {
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        
        lastScrollTime = now;
        
        if (e.deltaY > 0 && !isModalVisible) {
            openModal();
        }
    });

    modalCard.addEventListener('wheel', function(e) {
        if (!isModalVisible) return;

        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (modalCard.scrollTop === 0) {
                if (e.deltaY < 0) {  // Scroll ke atas
                    closeModal();
                }
            }
        }, 50);  // Menunggu scroll selesai

        e.stopPropagation();
    });

    // Touch support for mobile devices
    let touchStartY = 0;
    let initialScrollTop = 0;

    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        if (isModalVisible) {
            initialScrollTop = modalCard.scrollTop;
        }
    });

    window.addEventListener('touchmove', function(e) {
        if (isModalVisible) {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchY;

            if (modalCard.scrollTop === 0 && touchDiff < 0) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    window.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;

        const touchEndY = e.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        
        if (Math.abs(touchDiff) > 50) {
            lastScrollTime = now;
            
            if (touchStartY > touchEndY && !isModalVisible) {
                openModal();
            } else if (isModalVisible && modalCard.scrollTop === 0 && touchDiff < 0) {
                closeModal();
            }
        }
    });

    // Tambahkan event listener untuk scroll
    modalCard.addEventListener('scroll', function() {
        if (!isModalVisible) return;

        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (modalCard.scrollTop === 0) {
                const wheelEvent = new WheelEvent('wheel', { deltaY: -1 });
                modalCard.dispatchEvent(wheelEvent);
            }
        }, 150);
    });
});