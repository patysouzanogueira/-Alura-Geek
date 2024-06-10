import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");


async function criarProduto(evento) {
  evento.preventDefault();

  const nome = document.getElementById("campo__nome").value;
  const valor = document.getElementById("campo__valor").value;
  const imagem = document.getElementById("campo__imagem").value;



  await conectaApi.criaProduto(nome, valor, imagem);
  alert('Produto guardado com sucesso!');
}

//fazendo o botão guardar inserir o novo produto na lista
formulario.addEventListener("submit", evento => criarProduto(evento));


//Fazendo o botão limpar apagar o que foi digitado no formulario:

// Selecionando os campos do formulário
const nameInput = document.getElementById('campo__nome');
const valueInput = document.getElementById('campo__valor');
const imageInput = document.getElementById('campo__imagem');

// Função para limpar os campos
function limparFormulario() {
  // Definindo os valores dos campos como vazio
  nameInput.value = '';
  valueInput.value = '';
  imageInput.value = '';
}

// Adicionando um evento de clique ao botão "Limpar"
const limparButton = document.getElementById('limpar');
limparButton.addEventListener('click', limparFormulario);