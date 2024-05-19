import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './css/index.css';
import Search from './components/Search';
import User from './components/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;