import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/HomePage/hero';
import SearchResults from './components/HomePage/searchResults';
import Homepage from './components/HomePage/homepage';
import Login from './components/Authethication/login';
import Signup from './components/Authethication/signup';
import BusDetails from './components/HomePage/busDetails';
import Payment from './components/HomePage/payment';
import PaymentSignup from './components/Authethication/login';


function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage />}>
            <Route path="/" element={<Hero />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={< Signup />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/bus-details" element={<BusDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signup-signin" element={<PaymentSignup/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
