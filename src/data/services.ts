import type { Localized } from "@/data/team";

export type Service = {
  slug: string;
  icon: "layout" | "layers" | "shopping-bag" | "workflow" | "scale" | "trending-up";
  title: Localized;
  description: Localized;
};

// As três frentes de entrega do documento de identidade da Ritmo: direção,
// adoção e evolução. Cada uma é contratada em separado (ver services.note).
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
      pt: "Problema, alternativas e plano de ação. A escolha considera adequação, adoção, custo total, segurança e manutenção. Ajustar um processo ou aproveitar um sistema já contratado também pode ser a recomendação.",
      en: "Problem, alternatives and an action plan. The choice weighs fit, adoption, total cost, security and maintenance. Adjusting a process or using a system you already pay for can also be the recommendation.",
      es: "Problema, alternativas y plan de acción. La elección considera adecuación, adopción, costo total, seguridad y mantenimiento. Ajustar un proceso o aprovechar un sistema ya contratado también puede ser la recomendación.",
      zh: "问题、备选方案与行动计划。选择时综合考虑适配性、采用难度、总成本、安全与维护。调整流程或用好已采购的系统，也可能就是我们的建议。",
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
      pt: "Configuração, conexão, treinamento e aceite. A entrega termina testada e com as pessoas sabendo usar.",
      en: "Configuration, integration, training and sign-off. The delivery ends tested, with people who know how to use it.",
      es: "Configuración, conexión, capacitación y aceptación. La entrega termina probada y con las personas sabiendo usarla.",
      zh: "配置、连接、培训与验收。交付完成时已经过测试，团队也知道如何使用。",
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
      pt: "Uso, ajustes e prioridades do próximo ciclo. Acompanhamento exige capacidade definida; novas funções exigem decisão e orçamento.",
      en: "Usage, adjustments and priorities for the next cycle. Follow-up needs defined capacity; new features need a decision and a budget.",
      es: "Uso, ajustes y prioridades del próximo ciclo. El acompañamiento exige capacidad definida; las nuevas funciones exigen decisión y presupuesto.",
      zh: "使用情况、调整以及下一周期的优先事项。跟进需要明确的投入能力；新功能需要决策与预算。",
    },
  },
];
