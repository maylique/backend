import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
