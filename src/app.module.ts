import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ActionModule } from './action/action.module';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/elrond-service'),
    ActionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
