import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
}

const envsSchema: joi.ObjectSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envsSchema.validate(process.env);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const envVars: EnvVars = value;

if (error) {
  throw new Error(`Environment variables validation error: ${error.message}`);
}

export const envs = {
  port: envVars.PORT,
};
