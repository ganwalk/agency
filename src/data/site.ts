// Dados públicos de contato da Ritmo. Placeholder até a empresa decidir
// canais próprios definitivos (o domínio de email é fictício, ver README).
const WHATSAPP_MESSAGE = "Oi! Vi o site da Ritmo e queria conversar sobre a nossa operação.";
const WHATSAPP_NUMBER = "556298506450";

export const contact = {
  email: "contato@ritmoconsultoria.com.br",
  emailHref: "mailto:contato@ritmoconsultoria.com.br",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  linkedin: "https://br.linkedin.com/in/armando-custodio-00080320a",
  instagram: "https://www.instagram.com/ganwalk",
  github: "https://github.com/ganwalk",
};

// Chave pública do Web3Forms (web3forms.com), gratuito, sem backend.
// Placeholder: trocar pela chave real da Ritmo antes de publicar de verdade,
// senão o formulário de contato não entrega nenhum email.
export const web3FormsAccessKey = "SUBSTITUA_PELA_CHAVE_REAL_WEB3FORMS";
