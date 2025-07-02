import NavBar from "./NavBar"
import Home from "./pages/Home"
import WSB from "./pages/WSB"
import { HealthMonitor } from "./components/HealthMonitor"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wsb" element={<WSB />} />
      </Routes>
      
      <HealthMonitor />
    </BrowserRouter>
  )
}

export default App
