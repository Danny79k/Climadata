import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityService } from './services/air-quality.service';
import { AirQualityController } from './controllers/air-quality.controller';
import { Location, LocationSchema } from './schemas/location.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    HttpModule,
  ],
  controllers: [AirQualityController],
  providers: [AirQualityService],
})
export class AirQualityModule {}
