import './App.css';
import Games from './components/Games';
import GameDetail from './components/GameDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Games />}></Route>
          <Route path='/games' element={<Games />}></Route>
          <Route path='/game-detail' element={<GameDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
