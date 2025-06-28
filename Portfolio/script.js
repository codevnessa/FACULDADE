document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-section');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const contactForm = document.getElementById('contact-form');

    // Mostrar página específica
    function showPage(pageId) {
        // Esconder todas as páginas
        pages.forEach(page => page.classList.remove('active'));
        
        // Mostrar página selecionada
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active');
        
        // Atualizar menu ativo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Fechar menu mobile se aberto
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    // Navegação por links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            window.location.hash = targetPage;
        });
    });

    // Menu hambúrguer mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Carregar página com base no hash da URL
    function loadPageFromHash() {
        const validPages = ['sobre', 'formacao', 'portfolio', 'contato'];
        const pageFromHash = window.location.hash.substring(1);
        
        if (validPages.includes(pageFromHash)) {
            showPage(pageFromHash);
        } else {
            showPage('sobre');
            window.location.hash = 'sobre';
        }
    }

    // Gerenciar mudanças no hash
    window.addEventListener('hashchange', loadPageFromHash);
    
    // Inicializar página
    loadPageFromHash();

    // Formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                alert('Mensagem enviada com sucesso!');
            }, 1500);
        });
    }

    // Animar barras de progresso
    function animateProgressBars() {
        const bars = document.querySelectorAll('.level-fill');
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => bar.style.width = width, 100);
        });
    }
    
    // Executar animações após carregamento
    setTimeout(animateProgressBars, 500);
});