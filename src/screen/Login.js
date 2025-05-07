import './login.css';

export function Login(navigate) {
  const container = document.createElement('div');
  container.classList.add('login-container');
  
  container.innerHTML = `
    <h2>Login</h2>
    <input id="username" placeholder="Nome de usuário">
    <input id="password" type="password" placeholder="Senha">
    <button id="loginBtn">Entrar</button>
    <button id="registerBtn">Registrar</button>
  `;

  container.querySelector('#loginBtn').onclick = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = JSON.parse(localStorage.getItem(username));
    
    if (user && user.password === password) {
      sessionStorage.setItem('loggedUser', username);
      sessionStorage.setItem('loggedUserNotes', JSON.stringify(user.notes || []));
      navigate('home');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  container.querySelector('#registerBtn').onclick = () => navigate('register');

  return container;
}
