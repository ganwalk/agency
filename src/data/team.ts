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
      pt: "Design engineer focado em produto digital. Interfaces, design systems e protótipos de alta fidelidade que já saíram do papel em produtos reais.",
      en: "Design engineer focused on digital product. Interfaces, design systems and high fidelity prototypes that have already shipped as real products.",
      es: "Design engineer enfocado en producto digital. Interfaces, sistemas de diseño y prototipos de alta fidelidad que ya salieron del papel en productos reales.",
      zh: "专注于数字产品的设计工程师。界面、设计系统与高保真原型，均已在真实产品中落地。",
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
      pt: "Advogado formado pela USP. Cuida de contratos, LGPD e propriedade intelectual para que nenhuma pendência legal fique para trás.",
      en: "Lawyer graduated from USP. Handles contracts, data protection law and intellectual property so no legal loose end is left behind.",
      es: "Abogado graduado por la USP. Se ocupa de contratos, protección de datos y propiedad intelectual para que ningún pendiente legal quede atrás.",
      zh: "毕业于圣保罗大学（USP）的律师，负责合同、数据保护法与知识产权，确保不留下任何法律隐患。",
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
      pt: "Engenheiro de software em uma das maiores empresas de tecnologia do mundo. Traz padrão de engenharia de big tech para cada linha de código entregue.",
      en: "Software engineer at one of the world's largest technology companies. Brings big tech engineering standards to every line of code delivered.",
      es: "Ingeniero de software en una de las mayores empresas de tecnología del mundo. Aporta el estándar de ingeniería de big tech a cada línea de código entregada.",
      zh: "任职于全球最大科技公司之一的软件工程师，将大厂工程标准带入交付的每一行代码。",
    },
  },
];
