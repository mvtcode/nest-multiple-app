import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AdminModule } from './admin/admin.module';
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express';

(async () => {
  const server = express()
  const adapter = new ExpressAdapter(server);

  const admin = await NestFactory.create(AdminModule, adapter);
  const app = await NestFactory.create(AppModule, adapter);

  admin.setGlobalPrefix('/admin');
  app.setGlobalPrefix('/api');

  await Promise.all([
    app.init(),
    admin.init()
  ]);

  await adapter.listen(3000);
})();