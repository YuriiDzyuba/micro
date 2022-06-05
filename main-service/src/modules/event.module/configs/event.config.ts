export default () => ({
  redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
});
