# ServeRest - Suite Cypress

Automação de 3 cenários E2E e 3 cenários de API para o ServeRest, com Cypress + JavaScript.

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
npm run test:api     # só API (cy.request)
npm run test:e2e     # só UI
npm run test:all     # API + E2E (gera o relatório HTML)
npm run report:open  # abre o HTML gerado no navegador
npm run cy:open      # modo interativo
```

Requisito: Node 18+.

### Relatório HTML (mochawesome)

Depois de `npm run test:all`, o `cypress-mochawesome-reporter` gera um HTML único (assets inline) em:

`cypress/reports/html/index.html`

Para abrir: `npm run report:open`, ou abra o arquivo direto no navegador.  
A pasta `cypress/reports/` está no `.gitignore` (não versionar o HTML gerado).

## O que foi testado

Priorizei riscos de autenticação, autorização e catálogo admin. Ambiente público: cada teste cria dados únicos.

| ID | Tipo | Cenário | Risco |
|---|---|---|---|
| SRV-API-01 | API | Login inválido -> 401 | Falha de autenticação |
| SRV-API-02 | API | CRUD de produto como admin | Contrato do catálogo |
| SRV-API-03 | API | Usuário comum não cria produto (403) | Autorização |
| SRV-FE-01 | E2E | Cadastro + login | Onboarding e sessão |
| SRV-FE-02 | E2E | Admin cria e lista produto | Gestão admin no front |
| SRV-FE-03 | E2E | Login inválido na UI | Caminho negativo |

Casos em [docs/test-cases.md](docs/test-cases.md) (Gherkin / passos estilo Azure Test Plans) em inglês, alinhado ao padrão comum em pipelines e documentação de teste em times internacionais.

## Organização

```
cypress/
  api/          # specs de API (cy.request)
  e2e/          # specs de UI
  pages/        # Page Objects (Login, Cadastro, AdminProdutos)
  support/      # apiClient + factory de dados
```

- Page Objects nas telas (`data-testid` do front).
- `apiClient` encapsula `cy.request` e headers.
- `testData` gera email/nome/produto únicos por execução.
- Assertivas de status + campos de contrato (API) e URL/feedback (UI).

### Setup via API no E2E

Só em **SRV-FE-02**: o admin é criado pela API para isolar a UI no fluxo de produto. Os demais E2E não usam esse atalho.

## Estratégia

1. Auth e autorização primeiro (401/403 e login na UI).
2. CRUD admin de produto cobre o write path crítico do catálogo.
3. Cadastro/login cobre o funil básico do usuário.
4. Fora de escopo: carrinho completo, performance, mobile.

## CI

`azure-pipelines.yml` roda Node 20, `npm ci`, `npm run test:all`, publica o relatório HTML e screenshots se falhar. Localmente o equivalente é `npm run test:all`.

## Ambiente público / flaky

- O ServeRest público pode ficar lento ou com dados de outros usuários.
- Retry de runMode = 1 no Cypress.
- Se a API oscilar, comece por `npm run test:api`.
- E2E depende de rede e render do front; timeouts em 10-15s.
