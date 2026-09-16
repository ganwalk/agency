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

## Hero em duas fases

A home abre com uma hero simples (fundo claro, só texto). Depois de ~2,4s,
uma transição horizontal automática revela uma segunda hero, com imagem de
fundo em tela cheia e o cartão "Dream team". Dois pontos na base permitem
alternar manualmente entre as duas fases. Com `prefers-reduced-motion`
ativado, as duas fases aparecem empilhadas verticalmente, sem nenhuma
transição automática.

## Onde mexer

| Quero mudar                   | Vou em                                                |
| ------------------------------ | ------------------------------------------------------ |
| Textos do site                 | `src/i18n/dictionaries/pt.ts` (e en, es, zh)            |
| Equipe (nome, cargo, bio)      | `src/data/team.ts`                                      |
| Serviços                       | `src/data/services.ts`                                  |
| Contato (email, WhatsApp)      | `src/data/site.ts`                                       |
| Cores, fontes                  | `src/app/globals.css`                                   |
| Imagens de fundo                | `public/images/` (placeholders do Unsplash)              |

## Formulário de contato

Usa [Web3Forms](https://web3forms.com) (gratuito, sem backend). A chave em
`src/data/site.ts` (`web3FormsAccessKey`) é um placeholder: crie uma conta
gratuita no Web3Forms e troque pela chave real antes de publicar, senão o
formulário não entrega nenhum email.

## Pendências antes de publicar de verdade

- Fotos e bios reais dos quatro sócios (hoje são placeholders genéricos em
  `src/data/team.ts`, com avatares de iniciais no lugar de foto).
- Chave real do Web3Forms.
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
