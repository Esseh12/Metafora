import '../../styles/homepage.css';
import Navbar from "../HomePage/navbar";
import Hero from "../HomePage/hero";
import Steps from "../HomePage/steps";
import About from "../HomePage/about";
import Services from '../HomePage/services';
import Companies from '../HomePage/companies';
import Testimonies from '../HomePage/testimonies';
import Footer from '../HomePage/footer';
// import SearchResults from './searchResults';


const Homepage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Steps/>
            <About />
            <Services />
            <Companies />
            <Testimonies />
            <Footer />
            {/* <SearchResults /> */}
        </>
    )
}

export default Homepage;