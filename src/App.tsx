import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function MyButton() {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState (false)
  return (
  <>
   <button onClick={() => {setCount(count + 1);
    setClicked (true)
   }}>
   Eu sou um botão ({count})     </button>

      <p>Este botão já foi clicado? {clicked ? "Sim" : "Não"}</p>
    </>
  )
  
}
function Porfile() {
  return (
    <>
     <h2>{user.name}</h2>
        <img className="dinheiro" src={user.imageUrl}/>
        </>
  )

}
const user = {
  name: "João",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbl9-fpINcsBYTyahZ5v6JoixdVdvylGMy3g&s"
};

function App() {
  const [count, setCount] = useState(0)

return (

    <div>
      <h1> Clica se queres ser milionario</h1>
      <p>Queres aprender <br />é só carregar</p>
      <Porfile />
      <MyButton/>     
    </div>
  )
}



export default App
