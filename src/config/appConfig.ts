export default {
    nodePort: parseInt(process.env.NODE_PORT),
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    logging: true,
    migrationsRun: false,
    synchronize: true,
    dropSchema: false
};
