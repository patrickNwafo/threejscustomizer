import Canvas from "./canvas"
import Custormizer from "./pages/Custormizer"
import Home from "./pages/Home"

function App() {

  return (
    <main className="app transition-all">
      <Home />
      <Canvas />
      <Custormizer />
    </main>
  )
}

export default App
