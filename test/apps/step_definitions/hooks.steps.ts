import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { AppModule } from '../../../src/apps/app.module';
import { createConnection, DataSourceOptions } from 'typeorm';
import * as request from 'supertest';
import { typeOrmConfig } from '../../../src/contexts/shared/infrastructure/persistence/typeorm/config';

let app: INestApplication;
let jwt: string;

BeforeAll(async () => {
  const connection = await createConnection(typeOrmConfig as DataSourceOptions);
  await connection.synchronize();
  await connection.close();
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  const call = request(app.getHttpServer()).post('/auth/signup').send({
    email: 'user@acceptance-tests.com',
    password: '!!2233aA',
  });

  const response = await call.expect(201);

  jwt = response.body.accessToken;
});

AfterAll(async () => {
  const connection = await createConnection(typeOrmConfig as DataSourceOptions);
  await connection.dropDatabase();
  await connection.close();
  await app.close();
});

export { app, jwt };
