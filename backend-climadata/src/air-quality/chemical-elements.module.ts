import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChemicalElementsService } from './services/chemical-elements.service';
import { ChemicalElementsController } from './controllers/chemical-elements.controller';
import { ChemicalElement, ChemicalElementSchema } from './schemas/chemical-elements.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChemicalElement.name, schema: ChemicalElementSchema }]),
  ],
  controllers: [ChemicalElementsController],
  providers: [ChemicalElementsService],
})
export class ChemicalElementsModule {}