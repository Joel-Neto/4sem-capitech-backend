import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação capitech',
      version: '1.0.0',
      description: 'API capitech',
    },
    servers: [
      {
        url: 'https://capitech-back.vercel.app',
      },
    ],
  },
  apis: [
    './routes/*.ts',
    './controllers/*.ts',
    './routes/*.js',
    './controllers/*.js',
  ], // Caminho para os arquivos de rotas e controladores
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
