# Vídeo de apresentação

`level-intro.html` é a fonte do vídeo (24,5s, 30fps). `render.mjs` gera os MP4
em `export/`:

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
FFMPEG=/caminho/do/ffmpeg node video/render.mjs        # os dois formatos
FFMPEG=/caminho/do/ffmpeg node video/render.mjs 9x16   # só um
```

Precisa de Playwright (Chromium) e de um ffmpeg com libx264. O vídeo sai sem
áudio: a trilha entra na edição final.
