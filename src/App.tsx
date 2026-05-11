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
import Compliments from './pages/Compliments';
import Dashboard from './pages/Dashboard';
import WhatsAppContact from './components/WhatsAppContact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/Clients';
import AdminLeads from './pages/admin/Leads';
import AdminInvoices from './pages/admin/Invoices';
import AdminPortfolio from './pages/admin/PortfolioManager';
import AdminSettings from './pages/admin/Settings';

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

import AdminAuthGuard from './components/admin/AdminAuthGuard';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#030d1a]">
        <Routes>
          {/* Rota de Login sem Header/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Rotas de Administração Protegidas */}
          <Route path="/admin" element={<AdminAuthGuard><AdminDashboard /></AdminAuthGuard>} />
          <Route path="/admin/clientes" element={<AdminAuthGuard><AdminClients /></AdminAuthGuard>} />
          <Route path="/admin/leads" element={<AdminAuthGuard><AdminLeads /></AdminAuthGuard>} />
          <Route path="/admin/faturas" element={<AdminAuthGuard><AdminInvoices /></AdminAuthGuard>} />
          <Route path="/admin/portfolio" element={<AdminAuthGuard><AdminPortfolio /></AdminAuthGuard>} />
          <Route path="/admin/config" element={<AdminAuthGuard><AdminSettings /></AdminAuthGuard>} />

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
                    <Route path="/elogios" element={<Compliments />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
        <WhatsAppContact />
      </div>
    </BrowserRouter>
  );
};

export default App;
