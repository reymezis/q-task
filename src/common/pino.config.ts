export const configPino = {
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return req;
    },
  },
  redact: {
    paths: ['req.raw.body.password', 'req.headers.cookie'],
    censor: '** hidden **',
  },
  customProps: () => ({
    context: 'HTTP',
  }),
  transport: {
    target: 'pino-pretty',
    options: {
      singleLine: true,
    },
  },
};
