# ServeRest - Suite Cypress

Automacao de 3 cenarios E2E e 3 cenarios de API para o ServeRest, com Cypress + JavaScript.

- Front: https://front.serverest.dev/
- API: https://serverest.dev/

## Como rodar

```bash
npm ci
npx cypress install
npm run test:all
```

Scripts:

```bash
npm run test:api     # so API (cy.request)
npm run test:e2e     # so UI
npm run test:all     # API + E2E (gera o relatorio HTML)
npm run report:open  # abre o HTML gerado no navegador
npm run cy:open      # modo interativo
```

Requisito: Node 18+.

### Relatorio HTML (mochawesome)

Depois de `npm run test:all`, o `cypress-mochawesome-reporter` gera um HTML unico (assets inline) em:

`cypress/reports/html/index.html`

Para abrir: `npm run report:open`, ou abra o arquivo direto no navegador.  
A pasta `cypress/reports/` esta no `.gitignore` (nao versionar o HTML gerado).

## O que foi testado

Priorizei riscos de autenticacao, autorizacao e catalogo admin. Ambiente publico: cada teste cria dados unicos.

| ID | Tipo | Cenario | Risco |
|---|---|---|---|
| SRV-API-01 | API | Login invalido -> 401 | Falha de autenticacao |
| SRV-API-02 | API | CRUD de produto como admin | Contrato do catalogo |
| SRV-API-03 | API | Usuario comum nao cria produto (403) | Autorizacao |
| SRV-FE-01 | E2E | Cadastro + login | Onboarding e sessao |
| SRV-FE-02 | E2E | Admin cria e lista produto | Gestao admin no front |
| SRV-FE-03 | E2E | Login invalido na UI | Caminho negativo |

Casos em [docs/test-cases.md](docs/test-cases.md) (Gherkin / passos estilo Azure Test Plans) em ingles, alinhado ao padrao comum em pipelines e documentacao de teste em times internacionais.

## Organizacao

```
cypress/
  api/          # specs de API (cy.request)
  e2e/          # specs de UI
  pages/        # Page Objects (Login, Cadastro, AdminProdutos)
  support/      # apiClient + factory de dados
```

- Page Objects nas telas (`data-testid` do front).
- `apiClient` encapsula `cy.request` e headers.
- `testData` gera email/nome/produto unicos por execucao.
- Assertivas de status + campos de contrato (API) e URL/feedback (UI).

### Setup via API no E2E

So em **SRV-FE-02**: o admin e criado pela API para isolar a UI no fluxo de produto. Os demais E2E nao usam esse atalho.

## Estrategia

1. Auth e autorizacao primeiro (401/403 e login na UI).
2. CRUD admin de produto cobre o write path critico do catalogo.
3. Cadastro/login cobre o funil basico do usuario.
4. Fora de escopo: carrinho completo, performance, mobile.

## CI

`azure-pipelines.yml` roda Node 20, `npm ci`, `npm run test:all`, publica o relatorio HTML e screenshots se falhar. Localmente o equivalente e `npm run test:all`.

## Ambiente publico / flaky

- O ServeRest publico pode ficar lento ou com dados de outros usuarios.
- Retry de runMode = 1 no Cypress.
- Se a API oscilar, comece por `npm run test:api`.
- E2E depende de rede e render do front; timeouts em 10-15s.
