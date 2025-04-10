document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    // Initialize particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
      console.log('Particles.js loaded!');
    });

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
      mobileMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    mobileMenuToggle.addEventListener('click', openMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);

    // Close menu when clicking any link
    mobileMenuLinks.forEach(link => {
      if (!link.classList.contains('dark-mode-toggle')) {
        link.addEventListener('click', closeMobileMenu);
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollIndicator.style.width = `${scrollPercentage}%`;
    });

    // Scroll Down Animation
    const scrollDown = document.querySelector('.scroll-down');
    scrollDown.addEventListener('click', () => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    });

    // Typing Effect
    const typingText = document.querySelector('.typing-effect');
    const professions = ['UI/UX Design', 'Web Development', 'Digital Strategy', 'Creative Solutions'];
    let currentProfession = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

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
        isEnd = true;
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentProfession = (currentProfession + 1) % professions.length;
        setTimeout(type, 500);
      } else {
        const typingSpeed = isDeleting ? 100 : 150;
        setTimeout(type, typingSpeed);
      }
    }

    // Start typing effect
    type();

    // Testimonial expansion functionality
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');
    
    seeMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const testimonialContent = this.previousElementSibling;
        testimonialContent.classList.toggle('expanded');
        
        // Update button text
        if (testimonialContent.classList.contains('expanded')) {
          this.innerHTML = 'See Less <i class="fas fa-chevron-up"></i>';
        } else {
          this.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
        }
      });
    });

    // Auto-hide "See More" for short testimonials
    document.querySelectorAll('.testimonial-content').forEach(content => {
      if (content.scrollHeight <= 150) {
        content.nextElementSibling.style.display = 'none';
        content.style.maxHeight = 'none';
      }
    });

    // Initialize carousel navigation
    const carousel = document.getElementById('testimonialsCarousel');
    const carouselNav = document.getElementById('carouselNav');
    const cards = document.querySelectorAll('.testimonial-card');
    
    // Create navigation dots
    cards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        scrollToCard(index);
      });
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
    });

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
    });

    // Initialize responsive card widths
    const isMobile = window.innerWidth < 768;
    cards.forEach(card => {
      card.style.flex = isMobile ? '0 0 calc(100% - 2rem)' : '0 0 calc(33.333% - 1.333rem)';
    });

    // Load and render blog posts
    const postFiles = ['post1.json', 'post2.json', 'post3.json'];
    
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
      renderPosts(validPosts.slice(0, 3)); // Only show latest 3 posts
    })
    .catch(error => {
      const container = document.getElementById('posts-container');
      container.innerHTML = `
        <div class="error">
          <p>Failed to load posts:</p>
          <p>${error.message}</p>
        </div>
      `;
      console.error('Error loading posts:', error);
    });

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
          ? `<img src="post/${post.image}" alt="${post.title}" class="post-image">`
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

    // Handle Subscription Form
    document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the default form submission

      const form = e.target;
      const emailInput = document.getElementById('email');
      const successMessage = document.getElementById('successMessage');
      const errorMessage = document.getElementById('errorMessage');

      // Reset previous messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';

      // Validate email (you can add more robust validation if needed)
      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('emailAddress', emailInput.value);
      formData.append('fvv', '1');
      formData.append('partialResponse', '[null,null,"8451942554320962319"]');
      formData.append('pageHistory', '0');
      formData.append('fbzx', '5057574322375540524');

      // Send form data using Fetch API
      fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfhMCTSn5w5E2O091mmWmGVy4UTXOEfje3Rp3wf7GAinKNSlg/formResponse', {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests
        body: formData
      })
      .then(response => {
        // Show success message
        successMessage.style.display = 'flex';
      })
      .catch(error => {
        // Show error message
        errorMessage.style.display = 'flex';
        console.error('Error:', error);
      });
    });
  });
