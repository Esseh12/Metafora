import '../styles/homepage.css';
import Navbar from "./navbar";
import Hero from "./hero";
import Steps from "./steps";
import About from "./about";
import Services from './services';
import Companies from './companies';
import Testimonies from './testimonies';
import Footer from './footer';


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
        </>
    )
}

export default Homepage;