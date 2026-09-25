# Vídeos

Dois vídeos, cada um em 16:9 e 9:16, gerados por `render.mjs` a partir de uma
página HTML com uma função `render(t)` determinística.

## Para parceiros (`level-parceiros.html`, 51s, com trilha)

Vídeo de convencimento para quem está decidindo fechar com a Level.

| Arquivo | Formato |
| --- | --- |
| `export/level-parceiros-16x9.mp4` | 1920x1080 |
| `export/level-parceiros-9x16.mp4` | 1080x1920 |

Roteiro (texto revisado com a skill
[no-ai-slop](https://github.com/petergyang/no-ai-slop) e com
`COPYWRITING.md`; nenhum número, cliente ou resultado que a Level não tenha):

1. **Hoje** (0–9,6s): quatro fornecedores ligados à "Sua empresa", cada um
   com o próprio contrato e prazo. "Para lançar um produto digital, uma
   empresa costuma contratar quatro fornecedores." / "Cada um tem o próprio
   contrato, o próprio prazo e a própria versão do escopo." / "Quando o
   lançamento atrasa, ninguém responde pelo projeto inteiro."
2. **Level** (9,6–16s): os quatro cartões colapsam num ponto e viram a
   marca. "A Level reúne as quatro áreas num time, com um contrato e um
   responsável pelo projeto."
3. **Time** (16–33,5s): "Quem assina o projeto", um sócio por vez, com a
   credencial de `src/data/team.ts`.
4. **Proposta** (33,5–43s): o documento com o escopo, cada item marcado e
   assinado pela Level no fim. "As quatro áreas no mesmo cronograma e no
   mesmo contrato." / "O orçamento sai depois do diagnóstico, com o escopo
   real na mesa."
5. **Contato** (43–51s): o quadro de Monet abre a partir do sol. "Conte o
   que precisa mudar no seu negócio." / "Voltamos com um diagnóstico e os
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
FFMPEG=/caminho/do/ffmpeg node video/render.mjs                        # intro, os dois formatos
FFMPEG=/caminho/do/ffmpeg node video/render.mjs level-parceiros        # parceiros
FFMPEG=/caminho/do/ffmpeg node video/render.mjs level-parceiros 9x16   # só um formato
```

Precisa de Playwright (Chromium) e de um ffmpeg com libx264.
