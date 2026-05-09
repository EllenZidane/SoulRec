document.addEventListener('DOMContentLoaded', () => {
    // MENU RESPONSIVO (HOME)
    const mobileMenu = document.getElementById('mobile-menu');
    const navContainer = document.getElementById('nav-container');
    if (mobileMenu && navContainer) {
        mobileMenu.addEventListener('click', () => navContainer.classList.toggle('active'));
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
