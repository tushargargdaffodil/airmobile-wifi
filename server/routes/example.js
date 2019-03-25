export default function (server) {

  server.route({
    path: '/api/airmobile_wifi/example',
    method: 'GET',
    handler(req, reply) {
      retunr { time: (new Date()).toISOString() };
    }
  });

}
