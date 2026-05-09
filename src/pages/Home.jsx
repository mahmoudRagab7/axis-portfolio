import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import PublicResults from '../components/public/PublicResults';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <About />
      <Services />
      <PublicResults />
      <Contact />
    </div>
  );
};

export default Home;
