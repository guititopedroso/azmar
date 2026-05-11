import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Phone, User, Mail } from 'lucide-react';

export default function WhatsAppContact() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  // Esconder em páginas específicas
  const hiddenPaths = ['/login', '/admin', '/dashboard'];
  const isHidden = hiddenPaths.some(path => location.pathname.startsWith(path));

  if (isHidden) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "351932237817"; // Número AZMAR
    const message = `Olá AZMAR! 👋%0A%0A*Novo Pedido de Contacto*%0A*Nome:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A*Telemóvel:* ${formData.phone}%0A%0AAguardando contacto!`;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Fechar modal
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all z-50 group"
      >
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-20 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          Fala connosco!
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#030d1a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-[#071428] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-8 pb-4">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold text-white font-outfit mb-2">Fala connosco</h2>
              <p className="text-gray-400">Deixa os teus dados e avançamos para o WhatsApp.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Primeiro nome</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400/50" />
                    <input
                      required
                      type="text"
                      placeholder="Ex: João"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-all text-sm"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Último nome</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Silva"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-all text-sm"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400/50" />
                  <input
                    required
                    type="email"
                    placeholder="teu@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-all text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Telemóvel</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400/50" />
                  <input
                    required
                    type="tel"
                    placeholder="932 237 817"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-all text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                Continuar para WhatsApp
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            <div className="p-4 bg-white/5 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                Seguro & Confidencial · AZMAR Agency
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
