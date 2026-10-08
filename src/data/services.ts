import type { Localized } from "@/data/team";

export type Service = {
  slug: string;
  icon: "layout" | "layers" | "shopping-bag" | "workflow" | "scale" | "trending-up";
  title: Localized;
  description: Localized;
};

// "Como a consultoria se torna entrega", do documento de identidade da Ritmo:
// direção, adoção e evolução, com o texto do próprio documento.
export const services: Service[] = [
  {
    slug: "direcao",
    icon: "layout",
    title: {
      pt: "Direção: diagnóstico e escolha",
      en: "Direction: diagnosis and choice",
      es: "Dirección: diagnóstico y elección",
      zh: "方向：诊断与选择",
    },
    description: {
      pt: "Problema, alternativas e plano de ação.",
      en: "Problem, alternatives and an action plan.",
      es: "Problema, alternativas y plan de acción.",
      zh: "问题、备选方案与行动计划。",
    },
  },
  {
    slug: "adocao",
    icon: "workflow",
    title: {
      pt: "Adoção: implantação e uso",
      en: "Adoption: rollout and use",
      es: "Adopción: implementación y uso",
      zh: "采用：实施与使用",
    },
    description: {
      pt: "Configuração, conexão, treinamento e aceite.",
      en: "Configuration, integration, training and sign-off.",
      es: "Configuración, conexión, capacitación y aceptación.",
      zh: "配置、连接、培训与验收。",
    },
  },
  {
    slug: "evolucao",
    icon: "trending-up",
    title: {
      pt: "Evolução: acompanhamento",
      en: "Evolution: follow-up",
      es: "Evolución: acompañamiento",
      zh: "演进：持续跟进",
    },
    description: {
      pt: "Uso, ajustes e prioridades do próximo ciclo.",
      en: "Usage, adjustments and priorities for the next cycle.",
      es: "Uso, ajustes y prioridades del próximo ciclo.",
      zh: "使用情况、调整以及下一周期的优先事项。",
    },
  },
];
