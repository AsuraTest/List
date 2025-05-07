import { MeuBotao } from '../components/MeuBotao.js';
import './homeScreen.css';

export function HomeScreen(navigate) {
  const container = document.createElement('div');
  container.classList.add('home-container');
  
  container.innerHTML = `
    <h2>Minhas Anotações</h2>
    <div id="notes-list"></div>
  `;

  // Exemplo de anotações
  const notesList = container.querySelector('#notes-list');
  const notes = JSON.parse(localStorage.getItem('loggedUserNotes')) || [];
  
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <p>${note}</p>
      <button onclick="viewDetails(${index})">Ver Detalhes</button>
    `;
    notesList.appendChild(noteElement);
  });

  // Função para navegar até a tela de detalhes
  function viewDetails(index) {
    sessionStorage.setItem('noteIndex', index);
    navigate('detail');
  }

  // Botão para criar nova anotação
  container.appendChild(MeuBotao('Criar Nova Anotação', () => {
    alert('Criando nova anotação...');
  }));

  return container;
}
