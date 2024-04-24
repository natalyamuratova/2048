import {useEffect} from "react";
import {Header} from "./components/header/header.tsx";
import {Game} from "./pages/game/Game.tsx";
import {useMobileScrollLock} from "./hooks/use-mobile-scroll-lock.ts";
import './App.scss';

function App() {
  const { lockMobileScroll } = useMobileScrollLock();

  useEffect(() => { lockMobileScroll(); }, []);

  return (
    <div className="app-container">
      <Header/>
      <Game/>
    </div>
  )
}

export default App
