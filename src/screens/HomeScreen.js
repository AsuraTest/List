import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import { cores } from '../styles/global';

export function HomeScreen(navigate) {
  const container = document.createElement('div');
  container.classList.add('home-container');
  
  container.innerHTML = `
    <h2>Minhas Anotações</h2>
    <div id="notes-list"></div>
  `;

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

  function viewDetails(index) {
    sessionStorage.setItem('noteIndex', index);
    navigate('detail');
  }

  container.appendChild(MeuBotao('Criar Nova Anotação', () => {
    alert('Criando nova anotação...');
  }));

  return container;
}
