# Vídeos

Vídeos em 16:9 e 9:16, gerados por `render.mjs` a partir de uma página HTML com
uma função `render(t)` determinística.

## Ritmo. (`ritmo-apresentacao.html`, 84s, com trilha)

Filme de apresentação da Ritmo, num plano contínuo conduzido pela bola sólida
da marca, que faz o papel da batida: quica de palavra em palavra e preenche o
lettering, sincroniza as pistas, vira a marca, percorre o método e fecha cada
frase como ponto final.

Tudo nasce da bola: ela se divide em três para desenhar as pistas, vira a marca,
rola para o centro e se abre nos quatro degraus da escala, e vira quatro bolas
que crescem até os retratos dos sócios. A bola tem vida própria (estica na
direção do movimento, deixa rastro, achata ao pousar, respira parada), as
palavras amassam e fazem uma onda quando ela pousa, e o lettering entra letra a
letra, com um pequeno salto. Textos do documento de identidade intelectual da Ritmo;
a cena dos sócios usa `src/data/team.ts`.

| Arquivo | Formato |
| --- | --- |
| `export/ritmo-apresentacao-16x9.mp4` | 1920x1080 |
| `export/ritmo-apresentacao-9x16.mp4` | 1080x1920 |

1. **Abertura** (0–7s): "Cada empresa tem uma cadência.", palavra a palavra,
   em contorno que preenche quando a bola pousa; a bola vira o ponto final.
2. **Pistas** (7–16,5s): pessoas, processos e tecnologia, cada uma num tempo,
   com os atritos do documento (esforço, perda de informação, dificuldade de
   decisão). "Conhecer uma ferramenta é o começo." / "Seu valor depende de
   adequação, adoção e continuidade."
3. **Sincronia** (16,5–25,6s): uma agulha passa, as batidas entram no mesmo
   tempo, os atritos estouram e as pistas convergem num ponto, que vira a
   marca. "Tradução, escolha e adoção." / "É nesse espaço que a Ritmo atua."
   A bola cresce e abre a cena em papel.
4. **Método** (27–47s): a bola percorre a rota; em cada etapa pousa e se abre
   num círculo com a ilustração animada dentro (lupa, prioridade, escolha,
   encaixe, painel com ciclo), e a palavra entra letra a letra com a saída
   embaixo. A câmera aproxima quando a bola para e recua quando ela viaja; no
   fim, os cinco círculos lado a lado.
5. **Escala** (47–54,6s): a bola se abre em quatro degraus e sobe por eles,
   de aproveitar a desenvolver; no fim, mergulha no último degrau, que cresce e
   vira a tela escura, e ressurge no centro.
6. **Sócios** (50,6–57,6s): quatro sócios, quatro frentes, um por batida.
7. **Compromisso** (62–71,6s): "Critério para decidir. Cuidado para
   implantar." e os seis compromissos numa frase só ("Clareza, evidência,
   proporção, autonomia, transparência e continuidade."), em contorno, que a
   bola preenche palavra a palavra até virar o ponto final.
8. **Fecho** (71,6–84,4s): "Entender a rotina. Escolher com critério. Fazer
   funcionar." A bola desenha a marca e "Ritmo." volta com o ponto.

Trilha: o pad de acordes de fundo continua; os sons dos elementos são notas
curtas e macias em região média ("pluck"), e as transições são um acorde aberto
que cresce e se apaga ("bloom"), com um grave discreto nas viradas de fundo
("thump"). Para mudar só a trilha de um vídeo já renderizado:
`node video/trilha.mjs ritmo-apresentacao video/export/ritmo-apresentacao-16x9.mp4 video/export/ritmo-apresentacao-9x16.mp4`.

Os vídeos abaixo são da Level, mantidos como referência.

## Para parceiros (`level-parceiros.html`, 54s, com trilha)

Vídeo de convencimento para quem está decidindo fechar com a Level.

| Arquivo | Formato |
| --- | --- |
| `export/level-parceiros-16x9.mp4` | 1920x1080 |
| `export/level-parceiros-9x16.mp4` | 1080x1920 |

Roteiro (texto revisado com a skill
[no-ai-slop](https://github.com/petergyang/no-ai-slop) e com
`COPYWRITING.md`; nenhum número, cliente ou resultado que a Level não tenha):

1. **Hoje** (0–13,4s): quatro fornecedores ligados à "Sua empresa", cada um
   com o próprio contrato e prazo. "Um produto digital costuma passar
   por quatro fornecedores." / "Cada um com contrato, prazo e escopo
   próprios." / "Quando atrasa, ninguém responde pelo projeto inteiro."
2. **Level** (13,4–23,2s): os quatro cartões colapsam num ponto, a marca
   se desenha, "LeveL" entra e a assinatura segura sozinha na tela antes da
   frase. "A Level junta as quatro áreas num time e num contrato."
3. **Time** (23,2–30,6s): "Quem assina o projeto", os quatro sócios na
   mesma tela, com a credencial de `src/data/team.ts`.
4. **Proposta** (30,6–43,4s): o documento com o escopo, cada item marcado e
   assinado pela Level no fim. "Um cronograma e um contrato para as quatro
   áreas." / "O orçamento sai depois do diagnóstico."
5. **Contato** (43,4–54,4s): o quadro de Monet abre a partir do sol e o logo
   completo volta. "Conte o
   que precisa mudar." / "Voltamos com um diagnóstico e os
   próximos passos." / Fale com o time.

A trilha é sintetizada em `score.mjs` (pad de acordes, impactos graves nas
viradas, ticks nos detalhes, risco de caneta na assinatura) e segue os
momentos marcados em `window.CUES` da página.

## Apresentação curta (`level-intro.html`, 24,5s, sem áudio)

`level-intro.html` é a fonte do vídeo curto (24,5s, 30fps). `render.mjs` gera
os MP4 em `export/`:

| Arquivo | Formato | Uso |
| --- | --- | --- |
| `export/level-intro-16x9.mp4` | 1920x1080 | site, LinkedIn, YouTube, apresentação |
| `export/level-intro-9x16.mp4` | 1080x1920 | Reels, Stories, TikTok, Shorts |

## Roteiro

1. **Marca** (0–3,9s): o anel é desenhado, a bola sólida nasce dentro dele e
   sobe à direita até o lugar ("o nível alcançado subindo à direita").
2. **Proposta** (3,9–8,4s): título em contorno, linha de varredura, e o
   preenchimento chega junto com o quadro de Monet, revelado por um círculo
   que abre a partir do sol.
3. **Frentes** (8,4–12,6s): design, engenharia, direito e gestão.
4. **Time** (12,6–16,6s): os quatro sócios.
5. **Processo** (16,6–20,2s): do diagnóstico ao lançamento.
6. **Contato** (20,2–24,5s): marca, assinatura e "Fale com o time".

## Editar e renderizar

Abra `level-intro.html` por um servidor local na raiz do repo (a página usa
`../public/images/`) pra ver ao vivo; `?w=1080&h=1920` mostra a versão
vertical. Os textos ficam nas constantes do topo do `<script>`, o tempo de
cada cena em `T`.

```bash
FFMPEG=/caminho/do/ffmpeg node video/render.mjs ritmo-apresentacao     # Ritmo., os dois formatos
FFMPEG=/caminho/do/ffmpeg node video/render.mjs                        # intro da Level, os dois formatos
FFMPEG=/caminho/do/ffmpeg node video/render.mjs level-parceiros        # parceiros
FFMPEG=/caminho/do/ffmpeg node video/render.mjs level-parceiros 9x16   # só um formato
```

Precisa de Playwright (Chromium) e de um ffmpeg com libx264.
