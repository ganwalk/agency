// Dados públicos de contato da Level. Placeholder até a agência decidir
// canais próprios definitivos (o domínio de email é fictício, ver README).
const WHATSAPP_MESSAGE = "Oi! Vi o site da Level e queria conversar sobre um projeto.";
const WHATSAPP_NUMBER = "556298506450";

export const contact = {
  email: "contato@levelagencia.com.br",
  emailHref: "mailto:contato@levelagencia.com.br",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  linkedin: "https://br.linkedin.com/in/armando-custodio-00080320a",
  instagram: "https://www.instagram.com/ganwalk",
  github: "https://github.com/ganwalk",
};

// Chave pública do Web3Forms (web3forms.com), gratuito, sem backend.
// Placeholder: trocar pela chave real da Level antes de publicar de verdade,
// senão o formulário de contato não entrega nenhum email.
export const web3FormsAccessKey = "SUBSTITUA_PELA_CHAVE_REAL_WEB3FORMS";
