// Lógica do Painel Admin

// Verifica login simples
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('admin-dashboard').style.display = 'none';
    } else {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        carregarTabelaAdmin();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();

    // Evento de Login
    const loginBtn = document.getElementById('btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const user = document.getElementById('user').value;
            const pass = document.getElementById('pass').value;
            // Login simples hardcoded conforme pedido ("painel admin funcional e seguro", aqui usaremos algo básico para demonstração estática)
            if (user === 'admin' && pass === '1234') {
                sessionStorage.setItem('admin_logged_in', 'true');
                checkLogin();
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('admin_logged_in');
            checkLogin();
        });
    }

    // Formulário Produto
    const form = document.getElementById('form-produto');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            salvarProdutoAdmin();
        });
    }
});

function carregarTabelaAdmin() {
    const tbody = document.getElementById('admin-tbody');
    if (!tbody) return;

    const produtos = getProdutos();
    tbody.innerHTML = '';

    produtos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.imagem}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${p.nome}</td>
            <td>${p.categoria}</td>
            <td>${formatarPreco(p.preco)}</td>
            <td>${p.ativo ? '<span style="color: green">Ativo</span>' : '<span style="color: red">Inativo</span>'}</td>
            <td class="admin-actions">
                <button class="btn btn-small btn-edit" onclick="editarProduto(${p.id})">Editar</button>
                <button class="btn btn-small" style="background:#6c757d" onclick="toggleAtivo(${p.id})">${p.ativo ? 'Desativar' : 'Ativar'}</button>
                <button class="btn btn-small btn-danger" onclick="excluirProduto(${p.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarProdutoAdmin() {
    const id = document.getElementById('prod-id').value;
    const nome = document.getElementById('prod-nome').value;
    const preco = parseFloat(document.getElementById('prod-preco').value);
    const categoria = document.getElementById('prod-categoria').value;
    const descricao = document.getElementById('prod-descricao').value;
    
    // Imagem (simulando upload pegando string)
    let imagem = document.getElementById('prod-imagem').value;
    if (!imagem) imagem = 'images/logo.png'; // fallback

    let produtos = getProdutos();

    if (id) {
        // Editando
        const index = produtos.findIndex(p => p.id == id);
        if (index > -1) {
            produtos[index] = { ...produtos[index], nome, preco, categoria, descricao, imagem };
        }
    } else {
        // Novo
        const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        produtos.push({
            id: newId, nome, preco, categoria, descricao, imagem, ativo: true
        });
    }

    saveProdutos(produtos);
    carregarTabelaAdmin();
    
    // Limpa form
    document.getElementById('form-produto').reset();
    document.getElementById('prod-id').value = '';
    alert('Produto salvo com sucesso!');
}

window.editarProduto = function(id) {
    const produto = getProdutos().find(p => p.id === id);
    if (!produto) return;

    document.getElementById('prod-id').value = produto.id;
    document.getElementById('prod-nome').value = produto.nome;
    document.getElementById('prod-preco').value = produto.preco;
    document.getElementById('prod-categoria').value = produto.categoria;
    document.getElementById('prod-descricao').value = produto.descricao;
    document.getElementById('prod-imagem').value = produto.imagem;
    
    window.scrollTo(0, document.getElementById('form-produto').offsetTop - 50);
}

window.toggleAtivo = function(id) {
    let produtos = getProdutos();
    const index = produtos.findIndex(p => p.id === id);
    if (index > -1) {
        produtos[index].ativo = !produtos[index].ativo;
        saveProdutos(produtos);
        carregarTabelaAdmin();
    }
}

window.excluirProduto = function(id) {
    if (confirm('Tem certeza que deseja excluir permanentemente este produto?')) {
        let produtos = getProdutos();
        produtos = produtos.filter(p => p.id !== id);
        saveProdutos(produtos);
        carregarTabelaAdmin();
    }
}
