document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. CONTROLE DE NAVEGAÇÃO
       ========================================= */
    const btnDashboard = document.getElementById('link-dashboard');
    const btnAulas = document.getElementById('link-aulas');
    const btnAgenda = document.getElementById('link-agenda');
    const contentHome = document.getElementById('content-home');
    const contentAgenda = document.getElementById('content-agenda');
    const pageTitle = document.getElementById('page-title');
    const contentAulas = document.getElementById('content-aulas');
    

    
    if (btnAgenda && contentAgenda) {
        btnAgenda.addEventListener('click', (e) => {
            e.preventDefault();
            contentHome.style.display = 'none';
            contentAgenda.style.display = 'block';
            contentAulas.style.display = 'none';
            
            // Atualiza interface
            if(pageTitle) pageTitle.innerText = "Agenda de Aulas";
            btnDashboard.classList.remove('active');
            btnAulas.classList.remove('active');
            btnAgenda.classList.add('active');
            renderCalendar(); 
        });
    }

    if (btnDashboard && contentHome) {
        btnDashboard.addEventListener('click', (e) => {
            e.preventDefault();
            contentAgenda.style.display = 'none';
            contentHome.style.display = 'block';
            contentAulas.style.display = 'none';
            
            // Atualiza interface
            if(pageTitle) pageTitle.innerText = "Área do Aluno";
            btnAgenda.classList.remove('active');
            btnAulas.classList.remove('active');
            btnDashboard.classList.add('active');
        });
    }

    if (btnAulas && contentAulas) {
        
        btnAulas.addEventListener('click', (e) => {
        e.preventDefault();
        contentAgenda.style.display = 'none';
        contentHome.style.display = 'none';
        contentAulas.style.display = 'block';
        
        // Atualiza interface
        if(pageTitle) pageTitle.innerText = "Minhas Aulas";
        btnDashboard.classList.remove('active');
        btnAgenda.classList.remove('active');
        btnAulas.classList.add('active');
        carregarVideos();

    });
    }
    /* =========================================
       2. SIDEBAR RESPONSIVA (MOBILE)
       ========================================= */
    const btnOpen = document.getElementById('btnMenuMobile');
    const btnClose = document.getElementById('btnCloseMobile');
    const sidebar = document.getElementById('sidebar');

    if (btnOpen && sidebar) {
        btnOpen.addEventListener('click', () => sidebar.classList.add('active'));
    }
    if (btnClose && sidebar) {
        btnClose.addEventListener('click', () => sidebar.classList.remove('active'));
    }



    /* =========================================
       4. NAVEGAÇÃO DO CALENDÁRIO (SETAS)
       ========================================= */
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede erro de URL em arquivos locais
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede erro de URL em arquivos locais
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Inicializa o calendário ao carregar a página
    renderCalendar();

    /* =========================================
    5. MODO DARK
    ========================================= */
    
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');

            if (document.body.classList.contains('dark')) {
                themeToggle.innerText = '☀️';
            } else {
                themeToggle.innerText = '🌙';
            }
        });
    }


});

/* =========================================
    FUNÇÕES
    ========================================= */
let currentDate = new Date(); 

function renderCalendar() {
    const monthDisplay = document.getElementById('month-display');
    const grid = document.getElementById('calendar-grid');
    if (!grid || !monthDisplay) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const monthsNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", 
                            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    
    monthDisplay.innerText = `${monthsNames[month]} de ${year}`;
    grid.innerHTML = '';

    // Cabeçalho dos dias
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayNames.forEach(day => grid.innerHTML += `<div class="day-name">${day}</div>`);

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // 1. Dias vazios (meses anteriores)
    for (let x = 0; x < firstDayIndex; x++) {
        grid.innerHTML += `<div class="day-cell empty"></div>`;
    }

    // 2. Geração dos dias do mês
    for (let i = 1; i <= lastDay; i++) {
        let dayOfWeek = new Date(year, month, i).getDay();
        
        let hasEvent = (dayOfWeek === 2 || dayOfWeek === 4);
        
        const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        
        if (hasEvent) {
            grid.innerHTML += `
                <div class="day-cell has-event ${isToday ? 'today' : ''}" 
                        data-aula="Aula de Violão" 
                        data-data="${i}/${month + 1}/${year} às 14:00" 
                        data-prof="Professor: Carlos Silva">
                    ${i}
                    <div class="event-tag">Aula de Violão</div>

                </div>`;
        } else {
            grid.innerHTML += `<div class="day-cell ${isToday ? 'today' : ''}">${i}</div>`;
        }
    }
}

async function carregarVideos() {
    try {
        const response = await fetch('../src/aulas.json');
        const videos = await response.json();

        const container = document.querySelector('.video-grid');
        container.innerHTML = '';

        videos.forEach(video => {
            const item = document.createElement('div');
            item.classList.add('video-item');

            item.innerHTML = `
                <div class="video-thumb" onclick="playVideo('${video.nome}', this)">
                    <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">
                    <span class="duration">${video.duracao}</span>
                </div>

                <div class="video-details">
                    <h4>${video.titulo}</h4>
                    <p>Prof. ${video.professor}</p>
                    <span class="video-date">${video.data}</span>
                </div>

                <div class="video-actions">
                    <button onclick="playVideo('${video.nome}', this.closest('.video-item').querySelector('.video-thumb'))">▶ Assistir</button>
                </div>
            `;

            container.appendChild(item);
        });

    } catch (erro) {
        console.error('Erro ao carregar vídeos:', erro);
    }
}

function playVideo(videoNome) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    const source = document.getElementById("modalSource");

    source.src = `../src/img/aulas/${videoNome}.mp4`;

    video.load();
    video.play();

    modal.style.display = "flex";
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    video.pause();
    video.currentTime = 0;

    modal.style.display = "none";
}

const FilterUI = {
    currentDate: new Date(),
    selectedDate: null,

    // DROPDOWN
    toggleDropdown(el) {
        document.querySelectorAll('.dropdown').forEach(d => {
            if (!el.contains(d)) d.style.display = 'none';
        });

        const dd = el.querySelector('.dropdown');
        dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
    },

    // CALENDÁRIO
    toggleCalendar(el) {
        document.querySelectorAll('.calendar').forEach(c => {
            if (!el.contains(c)) c.style.display = 'none';
        });

        const cal = el.querySelector('.calendar');
        cal.style.display = cal.style.display === 'block' ? 'none' : 'block';

        this.renderCalendar(cal);
    },

    // SELECT OPTION
    selectOption(event, id, value) {
        event.stopPropagation();
        document.getElementById(id).innerText = value;

        document.querySelectorAll('.dropdown').forEach(d => {
            d.style.display = 'none';
        });
    },

    // MUDAR MÊS
    changeMonth(offset, container) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);
        this.renderCalendar(container);
    },

    // RENDER CALENDÁRIO
    renderCalendar(container) {
        container.innerHTML = "";

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // HEADER
        const header = document.createElement("div");
        header.className = "calendar-controls";
        header.innerHTML = `
            <div class="calendar-arrows">
                <button>◀</button>
            </div>
            <h3>${String(month + 1).padStart(2, '0')}/${year}</h3>
            <div class="calendar-arrows">
                <button>▶</button>
            </div>
        `;

        const prevBtn = header.querySelectorAll("button")[0];
        const nextBtn = header.querySelectorAll("button")[1];

        prevBtn.onclick = (e) => {
            e.stopPropagation();
            this.changeMonth(-1, container);
        };

        nextBtn.onclick = (e) => {
            e.stopPropagation();
            this.changeMonth(1, container);
        };

        container.appendChild(header);

        // GRID
        const grid = document.createElement("div");
        grid.className = "calendar-grid";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // espaços vazios
        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement("div"));
        }

        // dias
        for (let day = 1; day <= daysInMonth; day++) {
            const el = document.createElement("div");
            el.className = "day-cell";
            el.innerText = day;

            // SELECIONADO
            if (
                this.selectedDate &&
                day === this.selectedDate.day &&
                month === this.selectedDate.month &&
                year === this.selectedDate.year
            ) {
                el.classList.add("selected");
            }

            // CLICK
            el.onclick = (e) => {
                e.stopPropagation();

                this.selectedDate = { day, month, year };

                const formatted = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
                document.getElementById("dataValue").innerText = formatted;

                container.style.display = "none";
            };

            grid.appendChild(el);
        }

        container.appendChild(grid);
    }
};

document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-chip")) {
        document.querySelectorAll('.dropdown, .calendar')
            .forEach(el => el.style.display = 'none');
    }
});