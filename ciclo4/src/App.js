import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home'
import { ListarCli } from './views/Cliente/ListarCli';
import { ListarPed } from './views/Pedido/ListarPed';
import { ListarServ } from './views/Servico/ListarServ';
import { Menu } from './components/Menu';
import { Item } from './views/Servico/Item'
import { Cadastrar } from './views/Servico/cadastrar';
import { CadastrarPed } from './views/Pedido/cadastrar';
import { CadastrarCli } from './views/Cliente/cadastrarCli';
import { InfoPed } from './views/Pedido/infoPed';
import { ListarItem } from './views/Item/ListarItem';
import { CadastrarItem } from './views/Item/cadastrarItem';
import { ListarPedByClienteId } from './views/Cliente/infoCli';
import { EditarServ } from './views/Servico/editarServ';


function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listar-clientes" component={ListarCli} />
          <Route path="/cadastrarcliente" component={CadastrarCli} />
          <Route path="/listar-pedidos" component={ListarPed} />
          <Route path="/listar-servicos" component={ListarServ} />
          <Route path="/listar-pedido/:id" component={Item} />
          <Route path="/cadastrarservico" component={Cadastrar} />
          <Route path="/cadastrarpedido" component={CadastrarPed} />
          <Route path="/listarpedido/:id" component={InfoPed} />
          <Route path="/listar-item/" component={ListarItem}/>
          <Route path="/cadastraritem/" component={CadastrarItem}/>
          <Route path="/listar-pedido-do-cliente/:id" component={ListarPedByClienteId}/>
          <Route path="/atualizar-servico/" component={EditarServ}/>
          
        </Switch>
      </Router>


    </div>
  );
}

export default App;
