document.addEventListener('DOMContentLoaded', function() {
  // Dark Mode Toggle
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update icons
    const icon = isDarkMode ? 'sun' : 'moon';
    document.querySelectorAll('.dark-mode-toggle').forEach(toggle => {
      toggle.innerHTML = `<i class="fas fa-${icon}"></i>`;
    });
  }

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.querySelectorAll('.dark-mode-toggle').forEach(toggle => {
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
    });
  }

  // Add event listeners to all dark mode toggles
  document.querySelectorAll('.dark-mode-toggle').forEach(toggle => {
    toggle.addEventListener('click', toggleDarkMode);
  });

  // Mobile Menu Functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const closeMenuBtn = document.querySelector('.close-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobile sweetly.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

  // Close menu when clicking any link
  mobileMenuLinks.forEach(link => {
    if (!link.classList.contains('dark-mode-toggle')) {
      link.addEventListener('click', closeMobileMenu);
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  }, { passive: true });

  // Handle Subscription Form
  const subscriptionForm = document.getElementById('subscriptionForm');
  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const successMessage = document.getElementById('successMessage');
      const errorMessage = document.getElementById('errorMessage');

      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';

      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      const formData = new FormData();
      formData.append('emailAddress', emailInput.value);
      formData.append('fvv', '1');
      formData.append('partialResponse', '[null,null,"8451942554320962319"]');
      formData.append('pageHistory', '0');
      formData.append('fbzx', '5057574322375540524');

      fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfhMCTSn5w5E2O091mmWmGVy4UTXOEfje3Rp3wf7GAinKNSlg/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then(() => {
        if (successMessage) successMessage.style.display = 'flex';
      })
      .catch(error => {
        if (errorMessage) errorMessage.style.display = 'flex';
        console.error('Error:', error);
      });
    }, { passive: true });
  }

  // Trigger non-critical tasks after hero section is rendered
  const heroSection = document.querySelector('.hero') || document.body; // Fallback to body if .hero not found
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      requestAnimationFrame(() => {
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
          });
        }

        // Initialize particles.js
        if (typeof particlesJS !== 'undefined') {
          particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles.js loaded!');
          });
        }

        // Scroll Indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = document.documentElement.scrollTop;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollIndicator.style.width = `${scrollPercentage}%`;
          }, { passive: true });
        }

        // Scroll Down Animation
        const scrollDown = document.querySelector('.scroll-down');
        if (scrollDown) {
          scrollDown.addEventListener('click', () => {
            window.scrollBy({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }, { passive: true });
        }

        // Typing Effect
        const typingText = document.querySelector('.typing-effect');
        if (typingText) {
          const professions = ['UI/UX Design', 'Web Development', 'Digital Strategy', 'Creative Solutions'];
          let currentProfession = 0;
          let charIndex = 0;
          let isDeleting = false;

          function type() {
            const currentText = professions[currentProfession];
            
            if (isDeleting) {
              typingText.textContent = currentText.substring(0, charIndex - 1);
              charIndex--;
            } else {
              typingText.textContent = currentText.substring(0, charIndex + 1);
              charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
              isDeleting = true;
              setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
              isDeleting = false;
              currentProfession = (currentProfession + 1) % professions.length;
              setTimeout(type, 500);
            } else {
              const typingSpeed = isDeleting ? 100 : 150;
              requestAnimationFrame(() => setTimeout(type, typingSpeed));
            }
          }
          type();
        }

        // Testimonial expansion functionality
        const seeMoreButtons = document.querySelectorAll('.see-more-btn');
        seeMoreButtons.forEach(button => {
          button.addEventListener('click', function() {
            const testimonialContent = this.previousElementSibling;
            if (testimonialContent) {
              testimonialContent.classList.toggle('expanded');
              
              // Update button text
              if (testimonialContent.classList.contains('expanded')) {
                this.innerHTML = 'See Less <i class="fas fa-chevron-up"></i>';
              } else {
                this.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
              }
            }
          }, { passive: true });
        });

        // Auto-hide "See More" for short testimonials
        document.querySelectorAll('.testimonial-content').forEach(content => {
          if (content.scrollHeight <= 150) {
            if (content.nextElementSibling) {
              content.nextElementSibling.style.display = 'none';
            }
            content.style.maxHeight = 'none';
          }
        });

        // Initialize carousel navigation
        const carousel = document.getElementById('testimonialsCarousel');
        const carouselNav = document.getElementById('carouselNav');
        const cards = document.querySelectorAll('.testimonial-card');
        
        if (carousel && carouselNav) {
          // Create navigation dots
          cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
              scrollToCard(index);
            }, { passive: true });
            carouselNav.appendChild(dot);
          });

          // Handle scroll events
          let isScrolling = false;
          carousel.addEventListener('scroll', () => {
            if (!isScrolling) {
              window.requestAnimationFrame(() => {
                updateActiveDot();
                isScrolling = false;
              });
              isScrolling = true;
            }
          }, { passive: true });

          function updateActiveDot() {
            const scrollPosition = carousel.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 32; // card width + gap
            const activeIndex = Math.round(scrollPosition / cardWidth);
            
            document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
              dot.classList.toggle('active', index === activeIndex);
            });
          }

          function scrollToCard(index) {
            const cardWidth = cards[0].offsetWidth + 32; // card width + gap
            carousel.scrollTo({
              left: index * cardWidth,
              behavior: 'smooth'
            });
          }

          // Handle window resize to adjust card widths
          window.addEventListener('resize', () => {
            const isMobile = window.innerWidth < 768;
            cards.forEach(card => {
              card.style.flex = isMobile ? '0 0 calc(100% - 2rem)' : '0 0 calc(33.333% - 1.333rem)';
            });
          }, { passive: true });

          // Initialize responsive card widths
          const isMobile = window.innerWidth < 768;
          cards.forEach(card => {
            card.style.flex = isMobile ? '0 0 calc(100% - 2rem)' : '0 0 calc(33.333% - 1.333rem)';
          });
        }

        // Lazy-load blog posts
        const postsContainer = document.getElementById('posts-container');
        if (postsContainer) {
          const postFiles = ['post1.json', 'post2.json', 'post3.json'];
          
          const blogObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              Promise.all(postFiles.map(file => 
                fetch(`post/${file}`)
                  .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return response.json();
                  })
                  .then(post => {
                    post.filename = file.replace('.json', '');
                    return post;
                  })
                  .catch(error => {
                    console.error(`Error loading ${file}:`, error);
                    return null;
                  })
              ))
              .then(posts => {
                const validPosts = posts.filter(post => post !== null);
                validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                renderPosts(validPosts.slice(0, 3));
              })
              .catch(error => {
                postsContainer.innerHTML = `
                  <div class="error">
                    <p>Failed to load posts:</p>
                    <p>${error.message}</p>
                  </div>
                `;
                console.error('Error loading posts:', error);
              });
              blogObserver.disconnect();
            }
          }, { rootMargin: '100px' });
          blogObserver.observe(postsContainer);
        }

        function renderPosts(posts) {
          const container = document.getElementById('posts-container');
          
          if (posts.length === 0) {
            container.innerHTML = '<div class="error">No posts found.</div>';
            return;
          }
          
          let postsHTML = '';
          
          posts.forEach(post => {
            const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : '';
            
            const excerpt = post.content 
              ? post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
              : 'No content available';
            
            let tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
              tagsHTML = `
                <div class="tags">
                  ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              `;
            }
            
            const imageHTML = post.image 
              ? `<img src="post/${post.image}" alt="${post.title}" class="post-image" width="300" height="200">`
              : `<div class="post-image" style="background: linear-gradient(135deg, var(--primary), var(--secondary));"></div>`;
            
            postsHTML += `
              <a href="post-read.html?id=${post.filename}" class="post-link">
                <div class="post-card">
                  ${imageHTML}
                  <div class="post-content">
                    <h2 class="post-title">${post.title || 'Untitled Post'}</h2>
                    <div class="post-meta">
                      <span>By ${post.author || 'Unknown'}</span>
                      <span>${date}</span>
                    </div>
                    <p class="post-excerpt">${excerpt}</p>
                    ${tagsHTML}
                  </div>
                </div>
              </a>
            `;
          });
          
          container.innerHTML = postsHTML;
        }
      });
      observer.disconnect();
    }
  }, { threshold: 0.1 }); // Trigger when 10% of hero is visible
});