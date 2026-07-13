import './App.css';
import Liga5 from '../liga5.png';

// Página inicial da aplicação.
// Esta vista é simples de propósito intencional: funciona como ponto de entrada visual
// e como uma primeira impressão do projeto antes de entrar nas secções mais ricas.
function App() {
  return (
    <div className="pagina-principal">
      {/* Imagem principal da aplicação, usada como branding visual para o projeto. */}
      <img className="logo" src={Liga5} alt="Liga5" />
    </div>
  );
}

export default App;
