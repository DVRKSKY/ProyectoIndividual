import './App.css'
import { Routes, Route } from  'react-router-dom'
import NotFound from './components/NotFound'
import Consola from './components/Consola'
import Home from './views/Home'
import Details from './views/Details'
function App() {
  //Guardamos en variable para mandarolo como children al componente
  const home = <Home/>
  const details = <Details/>


  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Consola/>}/>
        <Route path='/home' element={<Consola>{home}</Consola>}/>
        <Route path='/details' element={<Consola>{details}</Consola>}/>
        <Route path='/404' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
