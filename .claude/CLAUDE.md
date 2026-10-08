# Ritmo. (repositório ganwalk/agency)

Site, vídeos e peças de marca da Ritmo, consultoria tecnológica (antes Level).
Stack e onde mexer no site: `README.md`.

## Regras para qualquer tarefa neste projeto

- **Conteúdo vem do documento de identidade.** Fonte:
  `docs/identidade/ritmo-identidade-intelectual.md` (transcrição do PDF ao lado).
  Site, vídeos e mídia kit usam as frases dele; não invente número, cliente,
  resultado ou credencial. A cena e a seção dos sócios usam `src/data/team.ts`.
  O caso da Arena no documento não vai para material público sem autorização.
- **Toda copy passa pela skill `no-ai-slop`** (`.claude/skills/no-ai-slop/`)
  antes do commit: detect, correção mínima, conferência com `eval.md`, nos
  quatro idiomas. As frases do documento são voz aprovada dos sócios: sinalize,
  não reescreva. Detalhes em `COPYWRITING.md`.
- **Marca.** Nome escrito "Ritmo." (R maiúsculo, ponto final). Símbolo: os dois
  círculos herdados da Level, sem ponto no meio, monocromático
  (`brand-assets/ritmo/simbolo.svg`, `src/components/layout/Logo.tsx`). A bola
  sólida do símbolo é o mesmo elemento do ponto final do nome. Fundo navy
  `#0d1017`, papel `#f3f2ee`, tinta `#14171e`, fonte Manrope. O diagrama da
  convergência (pessoas, processos, tecnologia) é usado com parcimônia: uma
  peça por conjunto, não em todas.
- **Vídeos** (`video/`, ver `video/README.md`). Linguagem de animação conduzida
  pela bola sólida, sem cara de slides. Trilha: pad sóbrio de fundo e sons de
  elemento discretos em região média (`pluck` com `soft: true`, notas de D4 a
  E5), transições tonais (`bloom`, acorde que cresce e se apaga) e `thump`
  baixo; nada de impacto grave, tique agudo ou woosh de ruído. Se só a trilha
  mudar, troque o áudio dos MP4 com `node video/trilha.mjs <página> <mp4...>`,
  sem renderizar a imagem de novo. Antes de renderizar, rode
  `node video/auditar-textos.mjs <página>`: todo texto precisa de pelo menos
  1,5s (ou 0,3s por palavra) visível, nítido e inteiro no quadro. Renderize em
  segundo plano com `OUT=<pasta temporária>` e só copie os MP4 prontos para
  `video/export/`; cada formato leva cerca de 30 minutos.
- **Contato público:** "Fale conosco" e +55 62 9850-6450.
