import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Phone, 
  Shield, 
  Save,
  Palette,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const supabase = createClient();
    const { data, error } = await supabase.from('site_settings').select('*');
    
    if (!error && data) {
      const settingsMap = data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setSettings(settingsMap);
    } else {
      // Fallback
      setSettings({
        contact_email: 'geral@azmar.pt',
        contact_phone: '+351 912 345 678',
        whatsapp_number: '351912345678',
        location_text: 'Setúbal, Portugal',
        instagram_url: 'https://instagram.com/azmar.pt',
        linkedin_url: 'https://linkedin.com/company/azmar-pt'
      });
    }
    setIsLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const supabase = createClient();
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));

    const { error } = await supabase.from('site_settings').upsert(updates);

    if (!error) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Configurações do Site</h1>
            <p className="text-gray-400 text-sm">Gere as informações gerais, contactos e preferências do site.</p>
          </div>
          {saveSuccess && (
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-bold">Guardado com sucesso!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-8">
          {/* Contact Information */}
          <div className="card bg-[#0a1c38]/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-teal-400/10 text-teal-400">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-outfit">Informações de Contacto</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="label">Email de Contacto</label>
                <input 
                  type="email" 
                  className="input" 
                  value={settings.contact_email || ''}
                  onChange={e => setSettings({...settings, contact_email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Telefone</label>
                <input 
                  type="text" 
                  className="input"
                  value={settings.contact_phone || ''}
                  onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Número WhatsApp</label>
                <input 
                  type="text" 
                  className="input"
                  value={settings.whatsapp_number || ''}
                  onChange={e => setSettings({...settings, whatsapp_number: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Localização</label>
                <input 
                  type="text" 
                  className="input"
                  value={settings.location_text || ''}
                  onChange={e => setSettings({...settings, location_text: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="card bg-[#0a1c38]/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white font-outfit">Redes Sociais</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="label">Instagram URL</label>
                <input 
                  type="text" 
                  className="input"
                  value={settings.instagram_url || ''}
                  onChange={e => setSettings({...settings, instagram_url: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">LinkedIn URL</label>
                <input 
                  type="text" 
                  className="input"
                  value={settings.linkedin_url || ''}
                  onChange={e => setSettings({...settings, linkedin_url: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">TikTok URL</label>
                <input 
                  type="text" 
                  className="input"
                  value={settings.tiktok_url || ''}
                  onChange={e => setSettings({...settings, tiktok_url: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 sticky bottom-8 z-10">
            <button 
              type="submit" 
              disabled={isSaving}
              className="btn btn-primary btn-lg shadow-2xl disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? 'A guardar...' : 'Guardar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
