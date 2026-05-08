import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Complaints from './pages/Complaints';

// Simulação de scroll to top em navegação
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#030d1a]">
        <Routes>
          {/* Rota de Login sem Header/Footer */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Públicas com Header/Footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicos" element={<Services />} />
                    <Route path="/pacotes" element={<Packages />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contactos" element={<Contact />} />
                    <Route path="/orcamento" element={<Quote />} />
                    <Route path="/privacidade" element={<Privacy />} />
                    <Route path="/termos" element={<Terms />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/reclamacoes" element={<Complaints />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
