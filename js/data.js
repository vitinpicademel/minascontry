const DADOS_INICIAIS = [
    {
        id: 1,
        nome: "Cabresto de Couro Cru - Boiadeiro",
        categoria: "gado",
        preco: 180.00,
        imagem: "images/cabresto_gado.png",
        descricao: "Cabresto para gado reforçado em couro cru com ferragens em latão maciço. Resistente e durável para a lida diária.",
        ativo: true
    },
    {
        id: 2,
        nome: "Cabresto Mangalarga Marchador Premium",
        categoria: "cavalo",
        preco: 250.00,
        imagem: "images/cabresto_cavalo.png",
        descricao: "Cabresto em couro de búfalo forrado. Design elegante e confortável para apresentações e cavalgadas. Ferragens douradas.",
        ativo: true
    },
    {
        id: 3,
        nome: "Sela Australiana Profissional",
        categoria: "selaria",
        preco: 2500.00,
        imagem: "images/sela.png",
        descricao: "Sela australiana completa, fabricada em couro vaqueta, assento macio, detalhes entalhados a mão. Ideal para longas cavalgadas.",
        ativo: true
    }
];

// Inicializa dados se não existir
function initDatabase() {
    if (!localStorage.getItem('minas_country_produtos')) {
        localStorage.setItem('minas_country_produtos', JSON.stringify(DADOS_INICIAIS));
    }
}

function getProdutos() {
    const produtos = localStorage.getItem('minas_country_produtos');
    return produtos ? JSON.parse(produtos) : [];
}

function saveProdutos(produtos) {
    localStorage.setItem('minas_country_produtos', JSON.stringify(produtos));
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getWhatsAppLink(produtoNome) {
    const telefone = "5534988756121"; // Telefone requisitado: (34) 98875-6121
    const mensagem = `Olá! Tenho interesse no produto: ${produtoNome}`;
    return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}

// Inicializa no carregamento
initDatabase();
