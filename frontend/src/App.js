import './App.css';
import Auth from './Components/Auth';
import Chat from './Components/Chat';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Auth} />
        <Route path='/chats' Component={Chat}/>
        <Route path='/register' Component={Register}/>
      </Routes>    
    </Router>
  );
}

export default App;
