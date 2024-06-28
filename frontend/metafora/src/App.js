import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/HomePage/hero';
import SearchResults from './components/HomePage/searchResults';
import Homepage from './components/HomePage/homepage';
import Login from './components/Authethication/login';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage />}>
              <Route path="/" element={<Hero />} />
            </Route>
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
