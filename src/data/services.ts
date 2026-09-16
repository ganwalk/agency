import type { Localized } from "@/data/team";

export type Service = {
  slug: string;
  icon: "layout" | "layers" | "shopping-bag" | "workflow" | "scale" | "trending-up";
  title: Localized;
  description: Localized;
};

export const services: Service[] = [
  {
    slug: "redesign",
    icon: "layout",
    title: {
      pt: "Redesign de sites e plataformas",
      en: "Website and platform redesign",
      es: "Rediseño de sitios y plataformas",
      zh: "网站与平台重设计",
    },
    description: {
      pt: "Modernizamos sites, sistemas e fluxos desatualizados com tecnologia atual, sem perder o que já funciona.",
      en: "We modernize outdated websites, systems and flows with current technology, without losing what already works.",
      es: "Modernizamos sitios, sistemas y flujos desactualizados con tecnología actual, sin perder lo que ya funciona.",
      zh: "以最新技术为过时的网站、系统与流程焕新，同时保留原本行之有效的部分。",
    },
  },
  {
    slug: "produtos-escalaveis",
    icon: "layers",
    title: {
      pt: "Produtos digitais escaláveis",
      en: "Scalable digital products",
      es: "Productos digitales escalables",
      zh: "可扩展的数字产品",
    },
    description: {
      pt: "Construímos plataformas, painéis e aplicações prontas para crescer junto com o seu negócio.",
      en: "We build platforms, dashboards and applications ready to grow together with your business.",
      es: "Construimos plataformas, paneles y aplicaciones listas para crecer junto con tu negocio.",
      zh: "打造随业务同步成长的平台、后台与应用程序。",
    },
  },
  {
    slug: "ecommerce-apps",
    icon: "shopping-bag",
    title: {
      pt: "E-commerce & aplicativos",
      en: "E-commerce & mobile apps",
      es: "E-commerce & aplicaciones",
      zh: "电商与移动应用",
    },
    description: {
      pt: "Lojas online e apps mobile pensados para conversão e experiência de uso.",
      en: "Online stores and mobile apps designed for conversion and a great user experience.",
      es: "Tiendas online y apps móviles pensadas para conversión y experiencia de uso.",
      zh: "以转化率与用户体验为核心设计的在线商店与移动应用。",
    },
  },
  {
    slug: "automacao",
    icon: "workflow",
    title: {
      pt: "Automação & integrações",
      en: "Automation & integrations",
      es: "Automatización & integraciones",
      zh: "自动化与系统集成",
    },
    description: {
      pt: "Conectamos suas ferramentas e automatizamos processos manuais que travam a operação.",
      en: "We connect your tools and automate manual processes that slow the operation down.",
      es: "Conectamos tus herramientas y automatizamos procesos manuales que traban la operación.",
      zh: "连接您的工具，将拖慢运营的人工流程自动化。",
    },
  },
  {
    slug: "direito-digital",
    icon: "scale",
    title: {
      pt: "Direito digital & compliance",
      en: "Digital law & compliance",
      es: "Derecho digital & compliance",
      zh: "数字法律与合规",
    },
    description: {
      pt: "Contratos, termos de uso, política de privacidade e adequação à LGPD, revisados por um advogado de verdade.",
      en: "Contracts, terms of use, privacy policy and data protection compliance, reviewed by an actual lawyer.",
      es: "Contratos, términos de uso, política de privacidad y cumplimiento de protección de datos, revisados por un abogado de verdad.",
      zh: "合同、使用条款、隐私政策及数据合规，均由真正的律师审核。",
    },
  },
  {
    slug: "gestao-crescimento",
    icon: "trending-up",
    title: {
      pt: "Gestão & consultoria de crescimento",
      en: "Management & growth consulting",
      es: "Gestión & consultoría de crecimiento",
      zh: "管理与增长咨询",
    },
    description: {
      pt: "Estratégia, processos e estrutura de gestão para escalar sem perder controle.",
      en: "Strategy, process and management structure to scale without losing control.",
      es: "Estrategia, procesos y estructura de gestión para escalar sin perder el control.",
      zh: "战略、流程与管理架构，助力扩张而不失控。",
    },
  },
];
