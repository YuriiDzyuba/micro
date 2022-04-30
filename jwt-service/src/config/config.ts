export const mongoDbUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/jwt-api';
export const redisUrl =
  process.env.REDIS_URL || 'redis://localhost:6379';
export const refreshJwtSecret =
  process.env.REFRESH_JWT_SECRET || 'secret';
export const accessJwtSecret =
  process.env.ACCESS_JWT_SECRET || 'accSecret';
export const refreshJwtExpIn =
  process.env.REFRESH_TOKEN_EXP_IN || '5h';
export const accessJwtExpIn =
  process.env.ACCESS_TOKEN_EXP_IN || '3h';

export const hostDomain =
  process.env.DOMAIN || 'http://localhost:3000';
export const hostDomainGlobalPrefix =
  process.env.DOMAIN || 'jwt-api';
