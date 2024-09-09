/*
 * Testes na API de Trilhas
 * Tecnologias utilizadas:
 * Supertest: Biblioteca para testes na API Rest do NodeJS
 * dotenv: Biblioteca para gerenciar variáveis de ambiente
 */
const request = require('supertest');
// const dotenv = require("dotenv");
// dotenv.config(); //carrega as variáveis do .env

const baseURL = 'https://capitech-back.vercel.app';

describe('API REST de trilhas sem o Token', () => {
  it('GET / - Lista todas as trilhas sem o token', async () => {
    const response = await request(baseURL)
      .get('/trilhas')
      .set('Content-Type', 'application/json')
      .expect(200); //OK
  });

  it('GET / Obtém trilha pelo ID sem o token', async () => {
    const id = '66723e754c45665580271c31'; // Incluir um ID existente
    const response = await request(baseURL)
      .get(`/trilhas/${id}`)
      .set('Content-Type', 'application/json')
      .expect(200); //OK
  });

  const trail = {
    name: 'JavaScript',
    subtitle: 'Var, Let e Const',
    Description: 'Testando método POST sem token',
    video_title: 'Diferença entre Var, Let e Const',
    video_description: 'Diferença entre Var, Let e Const',
    references: 'link do video',
  };
  it('POST - Inclui uma nova trilha sem autenticação', async () => {
    const response = await request(baseURL)
      .post('/trilhas')
      .set('Content-Type', 'application/json')
      .send(trail)
      .expect(401); //Unauthorized
  });

  const updateTrail = {
    name: 'JavaScript',
    subtitle: 'Var, Let e Const',
    Description: 'Testando método POST sem token',
    video_title: 'Diferença entre Var, Let e Const',
    video_description: 'Diferença entre Var, Let e Const',
    references: 'link do video',
  };
  it('PUT - Atualiza uma trilha sem autenticação', async () => {
    const id = '66723e754c45665580271c31'; // Incluir um ID existente
    const response = await request(baseURL)
      .put(`/trilhas/${id}`)
      .set('Content-Type', 'application/json')
      .send(updateTrail)
      .expect(401); //Unauthorized
  });

  it('DELETE - Deleta uma trilha sem autenticação', async () => {
    const id = '667348975f006198e17db5a3'; // Incluir um ID existente
    const response = await request(baseURL)
      .delete(`/trilhas/${id}`)
      .set('Content-Type', 'application/json')
      .expect(401); //Unauthorized
  });
});

describe('API REST de trilhas com o token', () => {
  let token; //Armazenaremos o access_token JWT
  it('POST - Autenticar usuário para retornar token JWT', async () => {
    const response = await request(baseURL)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'teste@email.com', password: 'teste123' })
      .expect(200); //OK

    token = response.body.data;
    expect(token).toBeDefined(); // Recebemos o token?
  });

  const trail = {
    name: 'JAVASCRIPT',
    subtitle: 'Var, Let e Const',
    description: 'Testando método POST com token',
    video_title: 'Diferença entre Var, Let e Const',
    video_description: 'Diferença entre Var, Let e Const',
    references: 'link do video',
  };

  let idTrail;
  it('POST - Inclui uma nova trilha com autenticação', async () => {
    const response = await request(baseURL)
      .post('/trilhas')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(trail)
      .expect(201); //Created

    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBe(true);

    idTrail = response.body.data._id;
    expect(response.body.data._id.length).toBeGreaterThan(0);
  });

  const updateTrail = {
    name: 'JS',
    subtitle: 'Var, Let e Const',
    Description: 'Alterando com o PUT',
    video_title: 'Diferença entre Var, Let e Const',
    video_description: 'Diferença entre Var, Let e Const',
    references: 'link do video',
  };
  it('PUT - Atualiza uma trilha com autenticação', async () => {
    const id = idTrail; // Incluir um ID existente
    const response = await request(baseURL)
      .put(`/trilhas/${id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(updateTrail)
      .expect(200); //OK

    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBe(true);
  });

  it('DELETE - Deleta uma trilha com autenticação', async () => {
    const id = idTrail; // Incluir um ID existente
    const response = await request(baseURL)
      .delete(`/trilhas/${id}`)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200); //OK

    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBe(true);
  });
});
