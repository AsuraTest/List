export function MeuBotao(texto, funcao) {
    const button = document.createElement('button');
    button.textContent = texto;
    button.onclick = funcao;
    return button;
  }
  