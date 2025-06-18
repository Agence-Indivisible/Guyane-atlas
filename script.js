// =====================
// Gestion des sliders
// =====================
const currentSlides = {};

function moveSlide(direction, sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('img');
    const dotsId = 'dots' + sliderId.replace('slider', '');
    const dots = document.getElementById(dotsId);
    const dotElements = dots.querySelectorAll('.dot');

    if (!currentSlides[sliderId]) {
        currentSlides[sliderId] = 0;
    }

    currentSlides[sliderId] += direction;

    if (currentSlides[sliderId] >= slides.length) {
        currentSlides[sliderId] = 0;
    } else if (currentSlides[sliderId] < 0) {
        currentSlides[sliderId] = slides.length - 1;
    }

    updateSlider(sliderId);
}

function goToSlide(index, sliderId) {
    currentSlides[sliderId] = index;
    updateSlider(sliderId);
}

function updateSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('img');
    const dotsId = 'dots' + sliderId.replace('slider', '');
    const dots = document.getElementById(dotsId);
    const dotElements = dots.querySelectorAll('.dot');

    slides.forEach((slide, index) => {
        slide.style.display = index === currentSlides[sliderId] ? 'block' : 'none';
    });

    dotElements.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlides[sliderId]);
    });
}

// Initialiser tous les sliders ET le SVG au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const sliderId = slider.id;
        currentSlides[sliderId] = 0;
        updateSlider(sliderId);
    });

    // =============================
    // Injection dynamique du SVG
    // =============================
    const svgContainers = document.querySelectorAll('.svg-container');

    svgContainers.forEach(container => {
        // Récupère la classe spécifique (bati, mobilite, etc.)
        const classes = Array.from(container.classList);
        const iconClass = classes.find(cls =>
            ['bati', 'mobilite', 'nature', 'territoire'].includes(cls)
        );

        if (iconClass) {
            const svgPath = `pictos/picto-${iconClass}.svg`;

            fetch(svgPath)
                .then(res => {
                    console.log(`Status fetch ${iconClass}:`, res.status);
                    if (!res.ok) throw new Error(`SVG introuvable: ${svgPath}`);
                    return res.text();
                })
                .then(svg => {
                    container.innerHTML = svg;
                })
                .catch(err => {
                    console.error(`Erreur SVG pour ${iconClass}:`, err);
                });
        } else {
            console.warn('Aucune classe SVG reconnue sur ce conteneur:', container);
        }
    });

    
    function injectSvgBackgroundWithTheme() {
        const style = getComputedStyle(document.body);
        const rgb = style.getPropertyValue('--primary-color-rgb').trim() || '0,0,0';
        const alpha = 0.3; // 30% opacity
      
       const rgbaColor = `rgba(${rgb}, ${alpha})`;

      
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          if (card.querySelector('.quote')) {
            const svg = `<svg width="41" height="27" viewBox="0 0 41 27" fill="${rgbaColor}" xmlns="http://www.w3.org/2000/svg"><path d="M30.9338 27C25.3792 27 21.3689 22.812 21.3689 16.6101C21.4037 7.6004 28.8208 1.23022 39.5213 0.0073204C40.5126 -0.107029 40.8952 1.15081 39.9822 1.52085C35.878 3.18844 33.8033 5.30389 33.5354 7.39711C33.3354 8.96147 34.2658 10.3321 35.4362 10.5894C38.4674 11.2548 40.4987 14.7027 40.4987 18.265C40.4987 20.5817 39.491 22.8035 37.6972 24.4416C35.9034 26.0797 33.4705 27 30.9338 27ZM10.0649 27C4.5103 27 0.5 22.812 0.5 16.6101C0.534782 7.6004 7.95193 1.23022 18.6524 0.0073204C19.6437 -0.107029 20.0263 1.15081 19.1133 1.52085C15.0091 3.18844 12.9344 5.30389 12.6666 7.39711C12.4666 8.96147 13.397 10.3321 14.5674 10.5894C17.5986 11.2548 19.6298 14.7027 19.6298 18.265C19.6298 20.5817 18.6221 22.8035 16.8283 24.4416C15.0345 26.0797 12.6017 27 10.0649 27Z" fill="${rgbaColor}"/></svg>`;
      
            const encodedSVG = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
      
            card.style.backgroundImage = `url("data:image/svg+xml,${encodedSVG}")`;
   
          }
        });
      }
      
      window.addEventListener('DOMContentLoaded', injectSvgBackgroundWithTheme);
      
      
      
      

    // ========================
    // Menu mobile
    // ========================
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
});


   // ========================
    // Fullscreen slider
    // ========================

// Gestion des boutons plein écran pour tous les sliders
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav.fullscreen').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sliderContainer = this.closest('.slider-container');
            const slider = sliderContainer.querySelector('.slider');
            
            if (!document.fullscreenElement) {
                // Sauvegarder l'état actuel du slider
                const currentSlide = currentSlides[slider.id] || 0;
                
                // Passer en plein écran
                if (sliderContainer.requestFullscreen) {
                    sliderContainer.requestFullscreen();
                } else if (sliderContainer.webkitRequestFullscreen) {
                    sliderContainer.webkitRequestFullscreen();
                } else if (sliderContainer.msRequestFullscreen) {
                    sliderContainer.msRequestFullscreen();
                }
                
                // S'assurer que le slider actif reste visible
                setTimeout(() => {
                    updateSlider(slider.id);
                }, 100);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    });
});

// Gérer la sortie du plein écran
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && 
        !document.msFullscreenElement) {
        // Mettre à jour tous les sliders lors de la sortie du plein écran
        document.querySelectorAll('.slider').forEach(slider => {
            if (slider.id) {
                updateSlider(slider.id);
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const tags = document.querySelectorAll('.tag');

    tags.forEach(tag => {
        const span = tag.querySelector('.tag-text');
        const div = tag.querySelector('.svg-container');

        // Vérifiez que les éléments existent
        if (span && div) {
            // Déplacer le div avant le span
            tag.insertBefore(div, span);
        }
    });
});
