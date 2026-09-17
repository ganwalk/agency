# Level

Site institucional da Level: agência formada por design de produto, engenharia
de software, direito digital e gestão de negócios, numa equipe só.

## Stack

Next.js 16 (App Router) com `output: "export"`: o `next build` gera HTML/CSS/
JS estáticos em `out/`, sem servidor. Mesmo padrão do portfólio
(`ganwalk/portifolio`): conteúdo tipado em `src/data/`, quatro idiomas
(`pt`, fonte da verdade, `en`, `es`, `zh`) com `Dictionary` derivado de
`src/i18n/dictionaries/pt.ts`.

Sem middleware nem rota de API: `public/index.html` lê `navigator.languages`
no navegador e redireciona para o prefixo de idioma certo.

## Hero: âncoras de design, depois o quadro

A home abre num canvas escuro com grade de pontos (a "tela infinita" de uma
ferramenta de design). Cantos, mira, réguas e uma linha de varredura montam
o layout em camadas (ver `HERO_TIMELINE` em `HeroGuides.tsx`), o título
aparece primeiro só como contorno (`-webkit-text-stroke`, sem preenchimento),
tudo isso segura numa pausa deliberadamente longa, e só depois o título
preenche de branco sólido e o quadro de fundo ("Impression, Sunrise", de
Monet, domínio público) revela juntos, na mesma janela de tempo, num único
gesto de consolidação. Sem slide, sem alternância manual: a sequência toca
uma vez, ao carregar, com ~4.4s do início ao estado final. Com
`prefers-reduced-motion` ativado, tudo já nasce no lugar, sem nenhuma das
animações.

Depois da hero, uma mira que segue o cursor (`MouseFollower`) continua pelo
site inteiro, em telas com mouse de verdade: o mesmo vocabulário visual da
hero, agora sob controle de quem visita.

## Onde mexer

| Quero mudar                   | Vou em                                                |
| ------------------------------ | ------------------------------------------------------ |
| Textos do site                 | `src/i18n/dictionaries/pt.ts` (e en, es, zh)            |
| Equipe (nome, cargo, bio)      | `src/data/team.ts`                                      |
| Serviços                       | `src/data/services.ts`                                  |
| Contato (email, WhatsApp)      | `src/data/site.ts`                                       |
| Cores, fontes                  | `src/app/globals.css`                                   |
| Imagens de fundo                | `public/images/` (placeholders do Unsplash)              |
| Ícones                          | [Hugeicons](https://hugeicons.com), via `@hugeicons/react` + `@hugeicons/core-free-icons` |
| Como escrever/revisar texto do site | [`COPYWRITING.md`](./COPYWRITING.md) |

## Formulário de contato

Usa [Web3Forms](https://web3forms.com) (gratuito, sem backend). A chave em
`src/data/site.ts` (`web3FormsAccessKey`) é um placeholder: crie uma conta
gratuita no Web3Forms e troque pela chave real antes de publicar, senão o
formulário não entrega nenhum email.

## Pendências antes de publicar de verdade

- Bios em `src/data/team.ts` já passaram por uma revisão de copy (ver
  `COPYWRITING.md`), mas vale cada sócio validar o próprio texto antes do
  ar (as fotos já são reais, ver `amigos/`).
- Chave real do Web3Forms.
- Email de contato (`src/data/site.ts`) usa um domínio fictício
  (`levelagencia.com.br`): trocar assim que a Level tiver domínio e email
  próprios.
- Revisão das páginas `/legal/privacy` e `/legal/terms` por um advogado
  (conteúdo hoje é um rascunho padrão, ainda sem revisão jurídica real).
- Domínio próprio: hoje o site publica em `ganwalk.github.io/agency`. Com
  domínio próprio, troque `NEXT_PUBLIC_SITE_URL` e remova
  `NEXT_PUBLIC_BASE_PATH` em `.github/workflows/deploy.yml`.

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000/pt/
npm run build   # gera o site estático em out/
```

## Publicação

Push na `main` publica sozinho no GitHub Pages, via GitHub Actions
(`.github/workflows/deploy.yml`).
