import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '180', 10),
    refreshTokenTtl: parseInt(
      process.env.JWT_REFRESH_TOKEN_TTL ?? '259200',
      10,
    ),
  };

  const schema = Joi.object({
    secret: Joi.string().required(),
    audience: Joi.string().required(),
    issuer: Joi.string().required(),
    accessTokenTtl: Joi.number(),
    refreshTokenTtl: Joi.number(),
  });

  const { error } = schema.validate(config, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation failed - An environment variable missing
        ${error.message}`,
    );
  }

  return config;
});
