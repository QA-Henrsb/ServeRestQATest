# Test Cases - ServeRest

Traceability for the 6 automated scenarios. IDs match Cypress specs under `cypress/api/` and `cypress/e2e/`.

Environment: Front `https://front.serverest.dev/` | API `https://serverest.dev/`  
Data rule: each run creates unique users/products (no fixed shared accounts).

---

## SRV-API-01 - Invalid login returns 401

**Type:** API  
**Risk:** Authentication failure handling  
**Smoke:** yes  
**Spec:** `cypress/api/srv-api-01-login-invalido.cy.js`

### Azure-style steps
1. Send `POST /login` with a non-existent email and wrong password.
2. Observe the HTTP response.

**Expected**
- Status `401`
- Body message: `Email e/ou senha inválidos`

### Gherkin
```gherkin
Feature: API login failures
  Scenario: Invalid credentials are rejected
    When the client posts /login with unknown email and password
    Then the response status is 401
    And the body message is "Email e/ou senha inválidos"
```

---

## SRV-API-02 - Admin product CRUD contract

**Type:** API  
**Risk:** Core catalog write path for administrators  
**Spec:** `cypress/api/srv-api-02-admin-produto-crud.cy.js`

### Azure-style steps
1. Create a unique admin user and obtain a bearer token.
2. `POST /produtos` with a unique product payload.
3. `GET /produtos/{id}` and validate fields.
4. `DELETE /produtos/{id}`.
5. `GET /produtos/{id}` again.

**Expected**
- Create: `201` + `_id` + success message
- Get: `200` + matching nome/preco/descricao/quantidade
- Delete: `200` + success message
- Get after delete: `400` (not found)

### Gherkin
```gherkin
Feature: Admin product lifecycle
  Scenario: Admin creates, reads and deletes a product
    Given an authenticated administrator
    When the admin creates a product
    Then the product can be retrieved with the same contract fields
    When the admin deletes the product
    Then a later get returns not found
```

---

## SRV-API-03 - Non-admin cannot create product

**Type:** API  
**Risk:** Authorization / privilege escalation  
**Smoke:** yes  
**Spec:** `cypress/api/srv-api-03-autorizacao-produto.cy.js`

### Azure-style steps
1. Create a unique non-admin user and login.
2. Attempt `POST /produtos` with that token.

**Expected**
- Status `403`
- Message: `Rota exclusiva para administradores`

### Gherkin
```gherkin
Feature: Product authorization
  Scenario: Common user is blocked from creating products
    Given an authenticated non-admin user
    When the user posts a new product
    Then the response status is 403
    And the message states the route is admin-only
```

---

## SRV-FE-01 - Register and login happy path

**Type:** E2E (UI)  
**Risk:** Account creation and session entry  
**Spec:** `cypress/e2e/srv-fe-01-cadastro-login.cy.js`

### Azure-style steps
1. Open `/cadastrarusuarios`.
2. Fill unique name, email and password; submit.
3. Confirm success feedback.
4. Clear session and open `/login`.
5. Authenticate with the same credentials.

**Expected**
- Success message after register
- After login, URL includes `/home` and logout control is visible

### Gherkin
```gherkin
Feature: User onboarding
  Scenario: New user registers and logs in
    Given the registration page is open
    When the user submits a unique valid registration
    And later logs in with the same credentials
    Then the store home is shown with logout available
```

---

## SRV-FE-02 - Admin creates and lists product

**Type:** E2E (UI)  
**Risk:** Admin catalog management on the front  
**Spec:** `cypress/e2e/srv-fe-02-admin-produto.cy.js`  
**Note:** Admin user is created via API (setup only). Documented in README.

### Azure-style steps
1. Create admin via API (precondition).
2. Login on the UI as that admin.
3. Open `/admin/cadastrarprodutos` and submit a unique product.
4. Open `/admin/listarprodutos`.

**Expected**
- Login lands on `/admin/home`
- Product name appears in the list table

### Gherkin
```gherkin
Feature: Admin product UI
  Scenario: Admin creates a product and sees it listed
    Given an admin account prepared via API
    When the admin logs in on the UI and creates a product
    Then the product name is visible on the list page
```

---

## SRV-FE-03 - Invalid login on UI

**Type:** E2E (UI)  
**Risk:** Visible negative auth path  
**Smoke:** yes  
**Spec:** `cypress/e2e/srv-fe-03-login-invalido.cy.js`

### Azure-style steps
1. Open `/login`.
2. Submit unknown email and wrong password.

**Expected**
- URL remains on `/login`
- Error text about invalid email/password is visible
- Logout control is absent

### Gherkin
```gherkin
Feature: UI login failures
  Scenario: Invalid credentials keep the user on login
    Given the login page is open
    When the user submits invalid credentials
    Then an error is shown
    And the user is not authenticated
```
