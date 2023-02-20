import * as assert from 'assert';
import { Given, Then } from '@cucumber/cucumber';
import * as request from 'supertest';
import { app as application, jwt } from './hooks.steps';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.getHttpServer())
    .get(route)
    .set('Authorization', `Bearer ${jwt}`);
});

Given('I send a DELETE request to {string}', (route: string) => {
  _request = request(application.getHttpServer())
    .delete(route)
    .set('Authorization', `Bearer ${jwt}`);
});

Given(
  'I send a POST request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.getHttpServer())
      .post(route)
      .send(JSON.parse(body))
      .set('Authorization', `Bearer ${jwt}`);
  },
);

Given(
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.getHttpServer())
      .put(route)
      .send(JSON.parse(body))
      .set('Authorization', `Bearer ${jwt}`);
  },
);

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response should be an object with body:', (body: string) => {
  assert.deepStrictEqual(_response.body, {
    ...JSON.parse(body),
    userId: _response.body.userId,
  });
});

Then('the response should be an array with this id:', (id: string) => {
  assert.ok(_response.body.find((book) => id === book.id));
});

Then('the response has to include a key {string}', (key: string) => {
  assert.ok(Object.keys(_response.body).includes(key));
});

Then(
  'the response array should be ordered by {string} desc',
  (field: string) => {
    assert.ok(
      _response.body.every(
        (val, i, arr) => !i || arr[i - 1][field] >= val[field],
      ),
    );
  },
);

Then(
  'the response array should be ordered by {string} asc',
  (field: string) => {
    assert.ok(
      _response.body.every(
        (val, i, arr) => !i || arr[i - 1][field] <= val[field],
      ),
    );
  },
);
