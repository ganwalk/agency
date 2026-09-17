// Dados da equipe fundadora. Nome e slug ficam iguais nos quatro idiomas
// (nome próprio não se traduz); cargo e bio seguem o padrão { pt, en, es, zh }.

export type Localized = {
  pt: string;
  en: string;
  es: string;
  zh: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  photo: string;
  role: Localized;
  bio: Localized;
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    slug: "armando-custodio",
    name: "Armando Custodio",
    photo: "/images/team/armando-custodio.jpg",
    role: {
      pt: "Design Engineer",
      en: "Design Engineer",
      es: "Design Engineer",
      zh: "设计工程师",
    },
    bio: {
      pt: "Passa da tela pro produto real: interfaces, design systems e protótipos de alta fidelidade que já viraram software em produção. O design engineer da Level.",
      en: "From screen to shipped product: interfaces, design systems and high fidelity prototypes now running in real software. Level's design engineer.",
      es: "De la pantalla al producto real: interfaces, sistemas de diseño y prototipos de alta fidelidad que ya funcionan en software en producción. El design engineer de Level.",
      zh: "从屏幕原型走到真实产品：界面、设计系统与高保真原型，均已在实际软件中运行。Level 的设计工程师。",
    },
    linkedin: "https://br.linkedin.com/in/armando-custodio-00080320a",
  },
  {
    slug: "diogo-siqueira",
    name: "Diogo Siqueira",
    photo: "/images/team/diogo-siqueira.jpg",
    role: {
      pt: "Gestão & Escala",
      en: "Operations & Scale",
      es: "Gestión & Escala",
      zh: "运营与增长",
    },
    bio: {
      pt: "Engenheiro de produção especialista em gestão e escalação de negócios. Estrutura processos e estratégia para o crescimento acontecer sem travar a operação.",
      en: "Production engineer specialized in business management and scaling. Structures process and strategy so growth happens without stalling operations.",
      es: "Ingeniero de producción especialista en gestión y escalamiento de negocios. Estructura procesos y estrategia para que el crecimiento ocurra sin trabar la operación.",
      zh: "生产工程师，专精企业管理与规模化。搭建流程与战略，让增长发生而不拖累运营。",
    },
  },
  {
    slug: "joao-pedro-carneiro",
    name: "João Pedro Carneiro",
    photo: "/images/team/joao-pedro-carneiro.jpg",
    role: {
      pt: "Direito & Compliance",
      en: "Law & Compliance",
      es: "Derecho & Compliance",
      zh: "法律与合规",
    },
    bio: {
      pt: "Advogado formado pela USP. Resolve contrato, LGPD e propriedade intelectual antes que virem dor de cabeça no lançamento.",
      en: "Lawyer graduated from USP. Handles contracts, data protection law and intellectual property before they become a headache at launch.",
      es: "Abogado graduado por la USP. Resuelve contratos, protección de datos y propiedad intelectual antes de que se conviertan en un dolor de cabeza en el lanzamiento.",
      zh: "毕业于圣保罗大学（USP）的律师。在合同、数据保护法与知识产权成为上线障碍之前，先一步解决。",
    },
  },
  {
    slug: "vitor-ribeiro",
    name: "Vitor Ribeiro",
    photo: "/images/team/vitor-ribeiro.jpg",
    role: {
      pt: "Engenharia de Software",
      en: "Software Engineering",
      es: "Ingeniería de Software",
      zh: "软件工程",
    },
    bio: {
      pt: "É engenheiro de software em uma das maiores empresas de tecnologia do mundo, e aplica o mesmo padrão em cada linha de código que entrega na Level.",
      en: "Software engineer at one of the world's largest technology companies, and brings that same standard to every line of code he ships at Level.",
      es: "Es ingeniero de software en una de las mayores empresas de tecnología del mundo, y aplica el mismo estándar en cada línea de código que entrega en Level.",
      zh: "任职于全球最大科技公司之一的软件工程师，把同样的标准带入他在 Level 交付的每一行代码。",
    },
  },
];
