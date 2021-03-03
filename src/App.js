import './App.css';
import { HashRouter as Router } from 'react-router-dom'
import Home from './pages'

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Route exact path={`/`} />
      <Home />
    </Router>
  );
}

export default App;
