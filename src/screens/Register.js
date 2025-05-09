import './register.css';

export function Register(navigate) {
  const container = document.createElement('div');
  container.classList.add('register-container');

  container.innerHTML = `
    <h2>Registrar</h2>
    <input id="username" placeholder="Nome de usuário">
    <input id="password" type="password" placeholder="Senha">
    <button id="registerBtn">Registrar</button>
  `;

  container.querySelector('#registerBtn').onclick = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (localStorage.getItem(username)) {
      alert('Usuário já existe!');
    } else {
      const newUser = { username, password, notes: [] };
      localStorage.setItem(username, JSON.stringify(newUser));
      sessionStorage.setItem('loggedUser', username);
      navigate('home');
    }
  };

  return container;
}
