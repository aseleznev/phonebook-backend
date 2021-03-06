import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const configService = app.get(ConfigService);
    const port = configService.get('appConfig').nodePort;

    app.setGlobalPrefix('phonebook');

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    const options = new DocumentBuilder()
        .setTitle('Phone book')
        .setDescription('Gazprom nedra corporate phone book')
        .setVersion('1.0')
        .addBasicAuth({ type: 'http', scheme: 'basic' }, 'local')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
        .addTag('users')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('phonebook/swagger', app, document);

    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Environment ${process.env.NODE_ENV}`);
}
bootstrap();
