import { api } from '../support/apiClient';

describe('SRV-API-01 - Login invalido retorna 401 @smoke', () => {
  it('rejeita credenciais inexistentes com status e mensagem esperados @smoke', () => {
    api.login('usuario.inexistente@example.com', 'senha-errada').then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });
});
