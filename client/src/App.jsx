
import { useSnapshot } from "valtio";
import Home from "./pages/Home";
import Custormizer from "./pages/Custormizer";
import CanvasModel from "./CanvasModel";
import state from "./store";


function App() {
  const snap = useSnapshot(state);

  return (
    <main
      className="transition-all app"
      style={{ background: `linear-gradient(135deg, ${snap.color}18 0%, #f0f0f0 100%)` }}
    >
      <Home />
      <CanvasModel />
      <Custormizer />
    </main>
  )
}

export default App
