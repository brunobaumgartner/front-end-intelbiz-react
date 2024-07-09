
import Navbar from './components/layout/Navbar.js';
import Vendas from './pages/vendas/vendas';
import Produtos from './pages/produtos/produtos';
import Clientes from './pages/clientes/Clientes';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'


function App() {
  return (
    <div class="container-fluid" id='container-full'>
    <Router>
      <div class="row" id='container'>
        <div class="col-md-auto" id='nav'>
          <Navbar />
        </div>
        <div class="col">
          <Routes>
            <Route path='/' element={<Vendas />} />
            <Route path='/produtos' element={<Produtos />} />
            <Route path='/clientes' element={<Clientes />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
