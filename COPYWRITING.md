# Guia de copy

Vale para todo texto da Ritmo que alguém de fora vai ler: o site
(`src/i18n/dictionaries/`, `src/data/`), os vídeos (`video/*.html`), o mídia
kit (`brand-assets/ritmo/midia-kit/`) e qualquer peça nova.

## De onde vem o texto

O documento de identidade intelectual da Ritmo é a fonte:
[`docs/identidade/ritmo-identidade-intelectual.md`](./docs/identidade/ritmo-identidade-intelectual.md)
(transcrição do PDF ao lado). Use as frases dele sempre que existirem. Não
invente número, cliente, resultado ou credencial; se faltar informação, pergunte.

As frases do documento são a voz aprovada dos sócios. Algumas usam um recurso
que a revisão abaixo aponta (frases curtas em sequência, como "Entender a
rotina. Escolher com critério. Fazer funcionar."). Elas ficam como estão; quem
muda essas frases são os sócios.

O caso da Arena descrito no documento está em andamento e não vai para material
público sem autorização.

## Revisão obrigatória: skill no-ai-slop

Todo texto novo ou alterado passa pela skill
[no-ai-slop](https://github.com/petergyang/no-ai-slop), instalada no projeto em
[`.claude/skills/no-ai-slop/`](./.claude/skills/no-ai-slop/) (MIT, de Peter
Yang). No Claude Code ela aparece como `/no-ai-slop` em qualquer sessão aberta
neste repositório.

1. Rode em modo detect: cada padrão encontrado, com a linha citada e a correção.
2. Corrija o que for texto nosso com a menor edição que resolve, preservando a
   voz do documento.
3. Confira o resultado contra `.claude/skills/no-ai-slop/eval.md`.
4. Aplique a mesma correção nos quatro idiomas (`pt` é a fonte; `en`, `es`, `zh`
   acompanham).

O que mais aparece por aqui, para revisar de olho mesmo sem a skill:

- **Travessão.** Em texto curto, nenhum. Troque por ponto, vírgula ou dois-pontos.
- **"Não é só X, é Y."** Diga Y.
- **Fragmento solto no fim** ("O design engineer da Ritmo."). Faça uma frase.
- **Dois-pontos com revelação** ("O melhor: funciona."). Use dois-pontos para
  lista e rótulo, com maiúscula depois quando vier frase.
- **Afirmação genérica.** Se a frase serviria para qualquer consultoria, corte
  ou troque por um fato do documento.
- **Palavras vazias.** Robusto, elevar, alavancar, potencializar, de ponta,
  transformador, sinergia, desbloquear.
- **Sem fonte.** "Uma das maiores empresas", "especialistas dizem": nomeie a
  fonte ou deixe claro que é afirmação da pessoa. A bio do Vitor ("uma das
  maiores empresas de tecnologia do mundo") é um caso assim: se puder, nomeie a
  empresa.

## Texto em vídeo

Além da revisão acima, todo texto precisa dar tempo de ler: pelo menos 1,5s
totalmente visível e nítido, ou 0,3s por palavra quando isso der mais, sempre
inteiro dentro do quadro. `node video/auditar-textos.mjs <página>` confere isso
nos dois formatos e sai com erro se algum texto falhar. Rode antes de renderizar.
