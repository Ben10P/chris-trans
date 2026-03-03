// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU MOBILE TOGGLE =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Changer l'icône
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ===== NAVIGATION ACTIVE LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const telephone = document.getElementById('telephone').value;
            const message = document.getElementById('message').value;
            const rgpd = document.getElementById('rgpd').checked;
            
            // Validation simple
            if (!nom || !email || !telephone || !message || !rgpd) {
                showFormMessage('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormMessage('Veuillez entrer un email valide', 'error');
                return;
            }
            
            // Simuler l'envoi (à remplacer par un vrai fetch/AJAX)
            showFormMessage('Envoi en cours...', 'info');
            
            // Ici, vous pouvez ajouter votre logique d'envoi (Fetch API, AJAX, etc.)
            // Exemple avec un timeout pour simuler l'envoi
            setTimeout(() => {
                // Succès
                showFormMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                contactForm.reset();
                
                // Optionnel : rediriger vers WhatsApp
                // window.open(`https://wa.me/2290161201432?text=Nom: ${nom}%0AEmail: ${email}%0ATéléphone: ${telephone}%0AMessage: ${message}`, '_blank');
            }, 1500);
        });
    }
    
    // Fonction pour afficher les messages du formulaire
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            
            // Auto-cacher après 5 secondes pour les succès
            if (type === 'success') {
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }
        }
    }
    
    // Validation d'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== SMOOTH SCROLL POUR LES LIENS D'ANCRAGE =====
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMATION AU SCROLL (OPTIONNEL) =====
    // Observer pour animer les cartes quand elles apparaissent
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes
    const cards = document.querySelectorAll('.service-card, .why-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // ===== BOUTON WHATSAPP : SUIVI DU TEXTE SUR MOBILE =====
    function adjustWhatsAppButton() {
        const whatsappBtn = document.querySelector('.whatsapp-float');
        if (whatsappBtn) {
            if (window.innerWidth <= 768) {
                whatsappBtn.setAttribute('title', 'Discuter sur WhatsApp');
            } else {
                whatsappBtn.removeAttribute('title');
            }
        }
    }
    
    window.addEventListener('resize', adjustWhatsAppButton);
    adjustWhatsAppButton();
    
    console.log('Site Transitaire Benoit - Prêt !');
});

// Slideshow hero
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.bg-image');
    const indicators = document.querySelectorAll('.indicator');
    if (!slides.length) return;
    
    let currentSlide = 0;
    slides[0].classList.add('active');
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        if (indicators.length) {
            indicators[currentSlide].classList.remove('active');
        }
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (indicators.length) {
            indicators[currentSlide].classList.add('active');
        }
    }
    
    setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', initHeroSlideshow);

// ===== FORMULAIRE VERS WHATSAPP =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const message = document.getElementById('message').value;
        const rgpd = document.getElementById('rgpd').checked;
        
        // Validation
        if (!nom || !email || !telephone || !message || !rgpd) {
            showFormMessage('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Numéro WhatsApp (sans le +)
        const numeroWhatsApp = '2290161201432'; // TON NUMÉRO ICI
        
        // Formater le message
        const texteWhatsApp = `*Nouveau message de ${nom}*%0A%0A` +
                              `📧 *Email:* ${email}%0A` +
                              `📱 *Téléphone:* ${telephone}%0A` +
                              `💬 *Message:* ${message}`;
        
        // Créer et ouvrir le lien WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${texteWhatsApp}`;
        
        // Afficher message de confirmation
        showFormMessage('Redirection vers WhatsApp...', 'success');
        
        // Ouvrir WhatsApp après un petit délai
        setTimeout(() => {
            window.open(urlWhatsApp, '_blank');
            // Réinitialiser le formulaire (optionnel)
            // contactForm.reset();
        }, 1500);
    });
}