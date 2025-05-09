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
  }, { passive: true });
});

// Non-critical tasks deferred to window.load
window.addEventListener('load', function() {
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

  // Scroll Indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollIndicator.style.width = `${scrollPercentage}%`;
  }, { passive: true });

  // Scroll Down Animation
  const scrollDown = document.querySelector('.scroll-down');
  scrollDown.addEventListener('click', () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, { passive: true });

  // Typing Effect
  const typingText = document.querySelector('.typing-effect');
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
    }, { passive: true });
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

  // Updated Lazy-load blog posts
  const postsContainer = document.getElementById('posts-container');
  
  // Only proceed if posts container exists on the page
  if (postsContainer) {
    console.log('Posts container found, initializing post loading');
    // Add a loading indicator
    postsContainer.innerHTML = '<div class="loading">Loading posts...</div>';
    
    const postFiles = ['post1.json', 'post2.json', 'post3.json'];
    
    // Try different possible paths for the JSON files
    const possiblePaths = [
      './post/',
      '../post/',
      './assets/post/',
      './data/post/',
      './',
      '/post/'
    ];
    
    // Function to attempt loading posts from multiple possible paths
    function loadPosts() {
      let currentPathIndex = 0;
      
      function tryPath() {
        if (currentPathIndex >= possiblePaths.length) {
          console.error('Failed to load posts from any path');
          postsContainer.innerHTML = `
            <div class="error">
              <p>Failed to load posts:</p>
              <p>Could not find post files in any known location</p>
            </div>
          `;
          return;
        }
        
        const currentPath = possiblePaths[currentPathIndex];
        console.log(`Trying to load posts from: ${currentPath}`);
        
        Promise.all(postFiles.map(file => 
          fetch(`${currentPath}${file}`)
            .then(response => {
              if (!response.ok) throw new Error(`Failed to load ${file}`);
              return response.json();
            })
            .then(post => {
              post.filename = file.replace('.json', '');
              return post;
            })
            .catch(error => {
              console.error(`Error loading ${file} from ${currentPath}:`, error);
              return null;
            })
        ))
        .then(posts => {
          const validPosts = posts.filter(post => post !== null);
          
          if (validPosts.length > 0) {
            console.log(`Successfully loaded ${validPosts.length} posts from ${currentPath}`);
            validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderPosts(validPosts.slice(0, 3)); // Only show latest 3 posts
          } else {
            console.log(`No valid posts found at ${currentPath}, trying next path`);
            currentPathIndex++;
            tryPath();
          }
        })
        .catch(error => {
          console.error(`Error processing posts from ${currentPath}:`, error);
          currentPathIndex++;
          tryPath();
        });
      }
      
      // Start trying paths
      tryPath();
    }
    
    // Start loading posts immediately instead of using IntersectionObserver
    loadPosts();
    
    // Alternatively, keep the original observer approach but with improved path handling
    /*
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadPosts();
        observer.disconnect();
      }
    }, { rootMargin: '100px' });
    observer.observe(postsContainer);
    */
  }

  function renderPosts(posts) {
    const container = document.getElementById('posts-container');
    
    if (!container) {
      console.error('Posts container not found when rendering posts');
      return;
    }
    
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
      
      // Improve image handling with fallback and error handling
      const imagePath = post.image 
        ? (post.image.startsWith('http') ? post.image : `post/${post.image}`)
        : null;
      
      const imageHTML = imagePath
        ? `<img src="${imagePath}" alt="${post.title}" class="post-image" width="300" height="200" onerror="this.onerror=null;this.src='';this.parentElement.style.background='linear-gradient(135deg, var(--primary), var(--secondary))';">`
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
    console.log('Posts rendered successfully');
  }

  // Handle Subscription Form
  document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const emailInput = document.getElementById('email');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

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
      successMessage.style.display = 'flex';
    })
    .catch(error => {
      errorMessage.style.display = 'flex';
      console.error('Error:', error);
    });
  }, { passive: true });
});