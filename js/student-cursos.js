/* =========================================
    CURSOS - CARGA E RENDERIZAÇÃO
    ========================================= */
let todosOsCursos = [];
let cursoSelecionado = null;

async function carregarCursos() {
    try {
        const response = await fetch('../src/cursos.json');
        todosOsCursos = await response.json();
        renderizarCursos(todosOsCursos);
    } catch (erro) {
        console.error('Erro ao carregar cursos:', erro);
    }
}

function renderizarCursos(cursos) {
    const grid = document.getElementById('cursosGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const cursosComprados = JSON.parse(localStorage.getItem('cursosComprados') || '[]');

    cursos.forEach(curso => {
        const cursoComprado = cursosComprados.includes(curso.id);
        const card = document.createElement('div');
        card.className = 'curso-card';
        card.innerHTML = `
            <div class="curso-icon">${curso.icone}</div>
            <h3>${curso.nome}</h3>
            <p class="curso-instrumento">${curso.instrumento}</p>
            <p class="curso-desc">${curso.descricao}</p>
            <div class="curso-info">
                <p><small>Prof. ${curso.professor}</small></p>
                <p><small>Nível: ${curso.nivel}</small></p>
            </div>
            <div class="curso-footer">
                <span class="curso-preco">${curso.preco}</span>
                <button class="btn-curso ${cursoComprado ? 'comprado' : ''}" onclick="abrirModalCurso(${curso.id})" ${cursoComprado ? 'disabled' : ''}>
                    ${cursoComprado ? '✓ Comprado' : 'Comprar'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function abrirModalCurso(cursoId) {
    cursoSelecionado = todosOsCursos.find(c => c.id === cursoId);
    if (!cursoSelecionado) return;

    document.getElementById('modalCursoNome').textContent = cursoSelecionado.nome;
    document.getElementById('modalCursoDesc').textContent = cursoSelecionado.descricao;
    document.getElementById('modalCursoProf').textContent = cursoSelecionado.professor;
    document.getElementById('modalCursoNivel').textContent = cursoSelecionado.nivel;
    document.getElementById('modalCursoDuracao').textContent = cursoSelecionado.duracao;
    document.getElementById('modalCursoValor').textContent = cursoSelecionado.preco;

    document.getElementById('purchaseModal').style.display = 'flex';
}

function closePurchaseModal() {
    document.getElementById('purchaseModal').style.display = 'none';
    cursoSelecionado = null;
}

function comprarCurso() {
    if (!cursoSelecionado) return;

    const cursosComprados = JSON.parse(localStorage.getItem('cursosComprados') || '[]');
    if (!cursosComprados.includes(cursoSelecionado.id)) {
        cursosComprados.push(cursoSelecionado.id);
        localStorage.setItem('cursosComprados', JSON.stringify(cursosComprados));
    }

    closePurchaseModal();
    renderizarCursos(todosOsCursos);
    
    alert('Parabéns! Curso comprado com sucesso! 🎉');
}

// Filtro de cursos
document.addEventListener('DOMContentLoaded', () => {
    const btnFiltrarCursos = document.getElementById('btnFiltrarCursos');
    if (btnFiltrarCursos) {
        btnFiltrarCursos.addEventListener('click', () => {
            const searchValue = document.getElementById('searchCurso')?.value.toLowerCase() || '';
            const nivelValue = document.getElementById('nivelValue')?.innerText || 'Todos';

            const cursosFiltrados = todosOsCursos.filter(curso => {
                const matchSearch = curso.nome.toLowerCase().includes(searchValue) || 
                                  curso.instrumento.toLowerCase().includes(searchValue);
                const matchNivel = nivelValue === 'Todos' || curso.nivel === nivelValue;
                return matchSearch && matchNivel;
            });

            renderizarCursos(cursosFiltrados);
        });
    }
});
