import './App.css'
import { Routes, Route } from  'react-router-dom'
import NotFound from './components/NotFound'
import Consola from './components/Consola'
import {Home, Details, Form} from './views/index'

function App() {
  //Guardamos en variable para mandarolo como children al componente
  const home = <Home/>
  const details = <Details/>
  const form = <Form/>



  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Consola/>}/>
        <Route path='/home' element={<Consola>{home}</Consola>}/>
        <Route path='/details' element={<Consola>{details}</Consola>}/>
        <Route path='/create' element={<Consola>{form}</Consola>}/>
        <Route path='/404' element={<NotFound/>}/>
        
      </Routes>
    </div>
  )
}

export default App
