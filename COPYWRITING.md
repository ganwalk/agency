# Guia de copy

Checklist pra quem for escrever ou revisar texto deste site (`src/i18n/dictionaries/`,
`src/data/team.ts`, `src/data/services.ts`). Existe porque texto gerado por IA
tem tiques reconhecíveis, e um site que vende trabalho de verdade não pode
soar como um LLM tentando vender a si mesmo.

## Os vícios mais comuns (e por que evitar)

- **Travessão em excesso.** Um humano usa travessão uma vez a cada várias
  centenas de palavras; modelos de linguagem usam a cada poucas frases. Troque
  por ponto, vírgula ou reestruture a frase.
- **"Não é só X, é Y."** Contraste artificial que cria uma expectativa que
  ninguém tinha, só pra "corrigi-la" depois. Se a frase original já é clara,
  a segunda metade é só enchimento.
- **Regra de três forçada.** Nem toda lista tem exatamente três itens. Duas
  opções, quatro, sete: o número certo é o que existe de verdade, não o que
  soa "redondo".
- **Jargão vazio.** "Robusto", "seamless", "state-of-the-art", "elevar",
  "desbloquear", "sinergia", "abrangente". Palavras que substituem
  informação por tom. Se der pra cortar sem perder sentido, corta.
- **Hedging uniforme.** IA tende a suavizar tudo igual ("pode ajudar a...",
  "em geral..."). Gente de verdade varia a confiança frase a frase, afirma
  quando sabe e é direta quando o dado é concreto.
- **Cadência de metrônomo.** Todo parágrafo do mesmo tamanho, toda frase
  entre 15 e 20 palavras. Varie o ritmo: uma frase curta depois de duas
  longas quebra o padrão e soa como alguém falando, não um gerador de texto.
- **O mesmo molde repetido.** Se quatro bios, quatro cards ou quatro seções
  seguem exatamente a mesma estrutura de frase (sujeito, verbo, propósito),
  troque a ordem, o tamanho, a pontuação. Repetição de fórmula é tão
  reconhecível quanto repetição de palavra.
- **Início em gerúndio.** "Trazendo uma nova abordagem para...", "Oferecendo
  uma solução completa..." — comece pela informação, não pelo enfeite.
- **Frases de abertura genéricas.** "No mundo acelerado de hoje...", "É
  importante notar que...", "Em suma...". Não dizem nada; corte direto.

## Como testamos este site

Antes de publicar uma leva de texto, passe pelo checklist acima procurando
por esses padrões. Na revisão que resultou neste arquivo, também variamos a
repetição da mesma frase-chave ("num time só" / "numa equipe só") em vários
lugares da página: mantém a ideia central (uma equipe, quatro frentes), mas
cada seção diz isso de um jeito diferente, em vez de reciclar a mesma
construção.

## Fontes

- [Signs of AI Writing: 27 Red Flags You Keep Missing](https://vrid.ai/blog/signs-of-ai-writing)
- [12 Red Flags of AI Writing (And How to Fix Them)](https://tahigichigi.substack.com/p/12-red-flags-of-ai-writing-and-how)
- [Top Worst AI Writing Clichés (And How to Fix Them)](https://stackedo.com/ai-writing-cliches-to-avoid/)
