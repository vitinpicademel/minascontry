// Lógica para renderizar produtos
function renderizarProdutos(containerId, maxProdutos = null, categoria = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let produtos = getProdutos().filter(p => p.ativo);
    
    if (categoria && categoria !== 'todos') {
        produtos = produtos.filter(p => p.categoria === categoria);
    }
    
    if (maxProdutos) {
        produtos = produtos.slice(0, maxProdutos);
    }

    container.innerHTML = '';

    if (produtos.length === 0) {
        container.innerHTML = '<p class="text-center" style="width: 100%; color: #666;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        
        let catNome = '';
        if(produto.categoria === 'gado') catNome = 'Cabrestos para Gado';
        else if(produto.categoria === 'cavalo') catNome = 'Cabrestos para Cavalo';
        else if(produto.categoria === 'selaria') catNome = 'Selaria';

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
            <div class="product-info">
                <span class="product-category">${catNome}</span>
                <h3 class="product-title">${produto.nome}</h3>
                <div class="product-price">${formatarPreco(produto.preco)}</div>
                <div style="display: flex; gap: 10px; margin-top: auto;">
                    <a href="produto.html?id=${produto.id}" class="btn btn-outline" style="flex: 1; padding: 10px; font-size: 0.9rem;">Detalhes</a>
                    <a href="${getWhatsAppLink(produto.nome)}" target="_blank" class="btn" style="flex: 1; padding: 10px; font-size: 0.9rem;">Comprar</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filtros da página de Loja
function setupFiltros() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active classe
            filterButtons.forEach(b => {
                b.style.backgroundColor = 'transparent';
                b.style.color = 'var(--color-secondary)';
            });
            
            // Add active style to clicked
            e.target.style.backgroundColor = 'var(--color-secondary)';
            e.target.style.color = 'var(--color-text-dark)';

            const categoria = e.target.getAttribute('data-filter');
            renderizarProdutos('loja-grid', null, categoria);
        });
    });
}

// Detalhes do Produto Individual
function carregarDetalhesProduto() {
    const container = document.getElementById('produto-detalhe');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    if (!id) {
        container.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    const produto = getProdutos().find(p => p.id === id);

    if (!produto || !produto.ativo) {
        container.innerHTML = '<p>Produto não encontrado ou indisponível.</p>';
        return;
    }

    document.getElementById('prod-img').src = produto.imagem;
    document.getElementById('prod-nome').textContent = produto.nome;
    document.getElementById('prod-preco').textContent = formatarPreco(produto.preco);
    document.getElementById('prod-desc').textContent = produto.descricao;
    document.getElementById('btn-comprar').href = getWhatsAppLink(produto.nome);
}

// Inicialização na carga da página
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza destaques na home
    renderizarProdutos('destaques-grid', 3);
    
    // Renderiza todos na loja
    renderizarProdutos('loja-grid');
    setupFiltros();

    // Carrega página de detalhes se existir
    carregarDetalhesProduto();
});
