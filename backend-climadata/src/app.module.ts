import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ChemicalElementsModule } from './air-quality/chemical-elements.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/nest', {
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    AuthModule,
    UsersModule,
    AirQualityModule,
    ChemicalElementsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
