import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './database/user/user.module';
import { AuthModule } from './auth/auth.module';
import { WorkerModule } from './database/worker/worker.module';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.load(resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'), {
            path: resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
            debug: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('appConfig'),
            inject: [ConfigService]
        }),
        UserModule,
        AuthModule,
        WorkerModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
