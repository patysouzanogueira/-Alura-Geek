async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/Produtos");
    const conexaoConvertida = await conexao.json();
  
    return conexaoConvertida;
  }
  
  async function criaProduto(nome, valor, imagem) {
    const conexao = await fetch("http://localhost:3000/Produtos", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        valor: valor,
        imagem: imagem,
        status: true,
      })
    });
  
    const conexaConvertida = await conexao.json();
  
    return conexaConvertida;
  }
  
  export const conectaApi = {
    listaProdutos,
    criaProduto,
  
  }