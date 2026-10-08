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
      pt: "É o design engineer da Ritmo. Leva interfaces, design systems e protótipos de alta fidelidade da tela até o software em produção.",
      en: "Ritmo's design engineer. He takes interfaces, design systems and high fidelity prototypes from the screen to software in production.",
      es: "Es el design engineer de Ritmo. Lleva interfaces, sistemas de diseño y prototipos de alta fidelidad de la pantalla al software en producción.",
      zh: "他是 Ritmo 的设计工程师，把界面、设计系统与高保真原型从屏幕带到正在运行的软件中。",
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
      pt: "Engenheiro de produção especialista em gestão e em escalar negócios. Estrutura processos e estratégia para o crescimento acontecer sem travar a operação.",
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
      pt: "É engenheiro de software em uma das maiores empresas de tecnologia do mundo e aplica o mesmo padrão no código que entrega na Ritmo.",
      en: "Software engineer at one of the world's largest technology companies. He applies the same standard to the code he delivers at Ritmo.",
      es: "Es ingeniero de software en una de las mayores empresas de tecnología del mundo y aplica el mismo estándar al código que entrega en Ritmo.",
      zh: "任职于全球最大科技公司之一的软件工程师，并把同样的标准用在他为 Ritmo 交付的代码上。",
    },
  },
];
