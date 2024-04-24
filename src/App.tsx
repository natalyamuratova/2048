import {Game} from "./pages/game/Game.tsx";
import {Header} from "./components/header/header.tsx";
import './App.scss';

function App() {
  return (
    <div className="app-container">
      <Header/>
      <Game/>
    </div>
  )
}

export default App
