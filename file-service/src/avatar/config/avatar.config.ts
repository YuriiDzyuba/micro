export default () => ({
    serviceName: process.env.SERVICE_NAME || 'file-service',
    natsUrl: process.env.NATS_URL || 'nats://nats:8222',
});
