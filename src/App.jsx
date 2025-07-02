import NavBar from "./NavBar"
import Home from "./pages/Home"
import WSB from "./pages/WSB"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wsb" element={<WSB />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
