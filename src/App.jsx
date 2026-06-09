import './App.css';
import Liga5 from '../liga5.png';

// Componente principal da página de entrada do site.
// Mostra apenas um título de boas-vindas para a aplicação.
function App() {
  return (
    <div className="pagina-principal">
      <img className="logo" src={Liga5} alt="Liga5" />
    </div>
  );
}

export default App;
