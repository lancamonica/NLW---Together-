//external
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//internal
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContexttProvider } from './context/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContexttProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>  
      </AuthContexttProvider>  
    </BrowserRouter>  
  );
}

export default App;
