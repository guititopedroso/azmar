import LegalPageLayout from '../components/layout/LegalPageLayout';

export default function Privacy() {
  return (
    <LegalPageLayout title="Política de Privacidade" lastUpdated="maio de 2025">
      <div className="space-y-6 text-[#94a3b8] text-sm leading-relaxed">
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">1. Responsável pelo tratamento</h2>
          <p>A AZMAR é responsável pelo tratamento dos dados pessoais recolhidos através deste website. Contacto: geral@azmar.pt.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">2. Dados recolhidos</h2>
          <p>Recolhemos os seguintes dados quando preenches formulários no nosso site: nome, email, telefone, nome do negócio e informações sobre o projeto. Estes dados são usados exclusivamente para responder ao teu pedido e prestar os nossos serviços.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">3. Finalidade</h2>
          <p>Os dados pessoais são tratados para: (a) responder a pedidos de contacto e orçamento; (b) gerir a relação comercial com clientes; (c) enviar comunicações relacionadas com os serviços contratados.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">4. Base legal</h2>
          <p>O tratamento de dados baseia-se no consentimento do titular (formulários de contacto) e na execução de contrato (clientes com serviços ativos).</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">5. Conservação</h2>
          <p>Os dados são conservados pelo período necessário à prestação do serviço e cumprimento de obrigações legais, podendo ser eliminados a pedido do titular.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">6. Direitos do titular</h2>
          <p>Tens direito a aceder, retificar, eliminar, limitar ou opor-te ao tratamento dos teus dados, bem como o direito à portabilidade. Para exercer estes direitos, contacta geral@azmar.pt.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">7. Subcontratantes</h2>
          <p>Utilizamos serviços de terceiros (como Supabase para armazenamento de dados) que processam dados em conformidade com o RGPD. Não vendemos nem partilhamos os teus dados com terceiros para fins comerciais.</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
