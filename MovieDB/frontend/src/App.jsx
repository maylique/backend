import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landingpage/LandingPage'
import Detail from './pages/detail/Detail'
// import Trailer from './pages/trailer/trailer'
import Home from './pages/home/Home'
import Trailer from './pages/trailer/Trailer'

import Search from './pages/search/Search'
import Storage from './pages/storage/Storage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/home' element={<Home />} />
        <Route path='/trailer' element={<Trailer />} />
        <Route path='/search' element={<Search />} />
        <Route path='/storage' element={<Storage />} />
      </Routes>
    </>
  )
}

export default App
