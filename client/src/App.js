import './App.css'
import { Routes, Route } from  'react-router-dom'
import NotFound from './components/NotFound'
import Consola from './components/Consola'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Consola/>}/>
        <Route path='/home' element={<Consola/>}/>
        <Route path='/404' element={<NotFound/>}/>

      </Routes>
    </div>
  )
}

export default App
