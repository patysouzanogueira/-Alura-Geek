import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

/* função paara atualizar os dados pelo id do registro existente no db.json*/
async function atualizaProduto(idProduto/* , nome, valor, imagem */) {
  const url = `http://localhost:3000/Produtos/${idProduto}`;
  try {
    const conexao = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        status: false // muda os status false, logo não irá mostrar na tela do usuario.
      })
    });
    if (!conexao.ok) {
      throw new Error('Erro ao atualizar o produto.');
    }
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    /* alert('Erro ao atualizar o produto. Por favor, tente novamente.'); */
  }
}  

function constroiCard(nome, valor, imagem, id) {
  const produto = document.createElement("li");
  produto.className = "produtos__item";
  produto.innerHTML = `
    <div class="card" data-id="${id}" data-nome="${nome}" data-valor="${valor}" data-imagem="${imagem}">
      <img src="${imagem}" alt="Imagem ${nome}" width="176" height="176">
      <div class="card__container__info">
        <p>${nome}</p>
        <div class="card__container__value">
          <p>R$ ${valor}</p>
          <img class="lixeira" src="./assets/lixo.png" alt="Ícone lixo">
        </div>
      </div>
    </div>
  `;

  const lixeira = produto.querySelector('.lixeira');
  lixeira.addEventListener('click', async () => {
    const card = lixeira.closest('.card');

    /* resolver o problema de undefined ao atualizar o campo status para false */
    const idProduto = card.getAttribute('data-id'); // Obter o ID do produto do card
  
    card.remove();
    /* chama a função atualizaProduto alterando o valor do campo status para false */
    await atualizaProduto(idProduto);
  });   

  return produto;
}


async function listaProdutos() {
  const listaApi = await conectaApi.listaProdutos();
  const statusProdutos = listaApi.filter(produto => produto.status);
  
  /* caso o valor seja maior que zero é porque existe status como true, já que o filter retorna um novo
  array true*/
  if (statusProdutos.length > 0) {
    statusProdutos.forEach(elemento => {
      lista.appendChild(constroiCard(elemento.nome, elemento.valor, elemento.imagem, elemento.id));
    });
  } else {
    const mensagem = document.createElement('li');
    mensagem.textContent = 'Nenhum produto cadastrado!';
    mensagem.style.color = '#5D04D9';
    mensagem.style.fontFamily = '"Press Start 2P", system-ui';
    mensagem.style.fontSize = '1.2rem';
    mensagem.style.fontWeight = '600';
    lista.appendChild(mensagem);
  }
}

listaProdutos();