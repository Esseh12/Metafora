import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero';
import SearchResults from './components/searchResults';
import Homepage from './components/homepage';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage />}>
              <Route path="/" element={<Hero />} />
            </Route>
            <Route path="/search-results" element={<SearchResults />} />
            </Routes>
        </Router>

    </>
  );
}

export default App;
