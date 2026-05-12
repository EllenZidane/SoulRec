document.addEventListener('DOMContentLoaded', () => {
    // MENU RESPONSIVO (HOME)
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // LOGIN
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = formLogin.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Armazena o email no localStorage
            localStorage.setItem('userEmail', email);
            
            if (email === 'admin@gmail.com' || email === 'teacher@gmail.com') {
                window.location.href = "admin.html";
            } else {
                window.location.href = "student.html"; 
            }
        });
    }

    // HERO SLIDER
    const heroSlider = document.getElementById('heroSlider');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dot');
    let activeSlide = 0;
    let slideTimer;

    function setSlide(index) {
        if (!slides.length) return;
        
        // Remove active and prev classes from all slides
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add prev class to current active slide
        slides[activeSlide].classList.add('prev');
        
        // Update to new slide
        activeSlide = index;
        slides[activeSlide].classList.add('active');
        dots[activeSlide].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (activeSlide + 1) % slides.length;
        setSlide(nextIndex);
    }

    function startSlider() {
        slideTimer = setInterval(nextSlide, 5500);
    }

    function stopSlider() {
        clearInterval(slideTimer);
    }

    if (heroSlider && slides.length) {
        startSlider();
        heroSlider.addEventListener('mouseenter', stopSlider);
        heroSlider.addEventListener('mouseleave', startSlider);

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = Number(dot.dataset.index);
                setSlide(index);
                stopSlider();
                startSlider();
            });
        });
    }

    const heroScrollButtons = document.querySelectorAll('.hero-scroll-btn');
    heroScrollButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#courses');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // MATRÍCULA (WHATSAPP)
    const formMatricula = document.getElementById('formMatricula');
    if (formMatricula) {
        formMatricula.addEventListener('submit', (e) => {
            e.preventDefault();
             // 1. Coleta os dados
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const tel = document.getElementById('telefone').value;
            const numeroEscola = "5511999999999"; // Altere para o número real

            // 2. Monta o link do WhatsApp
            const mensagem = `Olá, gostaria de me matricular na Soul Rec!%0A%0A` +
                            `*Nome:* ${nome}%0A` +
                            `*E-mail:* ${email}%0A` +
                            `*Telefone:* ${tel}`;
            const linkZap = `https://wa.me/${numeroEscola}?text=${mensagem}`;

            window.open(linkZap, '_blank');


            document.getElementById('formMatricula').style.display = 'none';
            document.querySelector('.login-card h2').style.display = 'none';
            document.querySelector('.login-card .subtitle').style.display = 'none';
            
            // Mostra a mensagem de sucesso
            const successMsg = document.getElementById('success-message');
            successMsg.style.display = 'block';

        });
    }
});
