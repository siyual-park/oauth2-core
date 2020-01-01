const generatePublicClient = require('../../../lib/lagacy/client/generate/generate-public-client');
const GenerateClientRequest = require('../../../lib/lagacy/request/generate-client-request');

const setUp = require('../set-up');

const ClientType = require('../../../lib/lagacy/client/type');

// eslint-disable-next-line no-undef
describe('Client', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    setUp();
  });

  // eslint-disable-next-line no-undef
  describe('Public Client', () => {
    // eslint-disable-next-line no-undef
    test('Generate Public Client', async () => {
      const client = await generatePublicClient(
        new GenerateClientRequest('Test', 'For library test', null),
      );

      // eslint-disable-next-line no-undef
      expect(client.id).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(client.id).toEqual(expect.stringMatching(/[a-z0-9]+/));

      // eslint-disable-next-line no-undef
      expect(client.secret).toEqual(null);

      // eslint-disable-next-line no-undef
      expect(client.type).toEqual(ClientType.PUBLIC);
    });

    // eslint-disable-next-line no-undef
    test('Generate Public Client And Check Create Others', async () => {
      const repeatTime = 10000;

      const clients = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < repeatTime; i++) {
        // eslint-disable-next-line no-await-in-loop
        const client = await generatePublicClient(
          new GenerateClientRequest('Test', 'For library test', null),
        );

        // eslint-disable-next-line no-undef
        expect(
          // eslint-disable-next-line max-len
          clients.every((createdClient) => createdClient.id !== client.id),
        ).toBeTruthy();

        clients.push(client);
      }
    });
  });
});