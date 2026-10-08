# Vídeos

Vídeos em 16:9 e 9:16, gerados por `render.mjs` a partir de uma página HTML com
uma função `render(t)` determinística.

## Ritmo. (`ritmo-apresentacao.html`, 72,4s, com trilha)

Apresentação da Ritmo depois da troca de nome. Mesmo motor, mesma linguagem
visual e mesma trilha sintetizada do vídeo para parceiros da Level; o texto sai
do documento de identidade da Ritmo, sem número, cliente ou resultado que a
empresa não tenha.

| Arquivo | Formato |
| --- | --- |
| `export/ritmo-apresentacao-16x9.mp4` | 1920x1080 |
| `export/ritmo-apresentacao-9x16.mp4` | 1080x1920 |

1. **Contexto** (0–13,8s): ferramentas soltas em volta de "Sua empresa".
   "Conhecer uma ferramenta é só o começo." / "O valor dela depende de
   adequação, adoção e continuidade." Depois o diagrama da página 1 do
   documento: pessoas, processos e tecnologia convergem num ponto, a escolha
   útil para a rotina real.
2. **Ritmo** (13,8–23,6s): o ponto da convergência vira a marca, "Ritmo."
   entra com "Consultoria tecnológica" e a frase "Tecnologia que faz sentido
   na prática."
3. **Método** (23,6–34,4s): entender, priorizar, escolher, adotar,
   acompanhar, cada etapa com a sua saída.
4. **Escala** (34,4–42s): aproveitar, configurar, conectar, desenvolver.
5. **Time** (42–49,4s): os quatro sócios, com a credencial de
   `src/data/team.ts`.
6. **Entrega** (49,4–61,4s): o plano com direção, adoção, evolução e
   interesses comerciais declarados, assinado pela Ritmo.
7. **Contato** (61,4–72,4s): o quadro de Monet abre a partir do sol. "Vamos
   começar pela sua rotina." / "Entender a rotina. Escolher com critério.
   Fazer funcionar." / Fale com a Ritmo.

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
