import './detailScreen.css';

export function DetailScreen(navigate) {
  const container = document.createElement('div');
  container.classList.add('detail-container');
  
  const noteIndex = sessionStorage.getItem('noteIndex');
  const notes = JSON.parse(localStorage.getItem('loggedUserNotes')) || [];
  const note = notes[noteIndex];

  container.innerHTML = `
    <h2>Detalhes da Anotação</h2>
    <p>${note}</p>
    <button onclick="goBack()">Voltar</button>
  `;

  // Função para voltar à tela de Home
  function goBack() {
    navigate('home');
  }

  return container;
}
