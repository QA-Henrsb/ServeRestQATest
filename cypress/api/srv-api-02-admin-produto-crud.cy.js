import { api } from '../support/apiClient';
import { buildAdmin, buildProduct } from '../support/testData';

describe('SRV-API-02 - CRUD de produto como admin', () => {
  let adminToken;
  let productId;
  const product = buildProduct();

  before(() => {
    const admin = buildAdmin();

    api.createUser(admin).then((createRes) => {
      expect(createRes.status).to.eq(201);
      expect(createRes.body).to.have.property('_id');

      return api.login(admin.email, admin.password);
    }).then((loginRes) => {
      expect(loginRes.status).to.eq(200);
      expect(loginRes.body).to.have.property('authorization');
      adminToken = loginRes.body.authorization;
    });
  });

  it('cria, consulta e remove produto validando contrato', () => {
    api.createProduct(adminToken, product).then((createRes) => {
      expect(createRes.status).to.eq(201);
      expect(createRes.body).to.include({
        message: 'Cadastro realizado com sucesso',
      });
      expect(createRes.body).to.have.property('_id').and.be.a('string');
      productId = createRes.body._id;

      return api.getProduct(adminToken, productId);
    }).then((getRes) => {
      expect(getRes.status).to.eq(200);
      expect(getRes.body).to.include({
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,
        quantidade: product.quantidade,
        _id: productId,
      });

      return api.deleteProduct(adminToken, productId);
    }).then((deleteRes) => {
      expect(deleteRes.status).to.eq(200);
      expect(deleteRes.body).to.have.property(
        'message',
        'Registro excluído com sucesso',
      );

      return api.getProduct(adminToken, productId);
    }).then((afterDelete) => {
      expect(afterDelete.status).to.eq(400);
      expect(afterDelete.body.message).to.match(/não encontrado/i);
    });
  });
});
