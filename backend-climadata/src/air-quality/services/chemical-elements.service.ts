import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChemicalElement, ChemicalElementDocument } from '../schemas/chemical-elements.schema';
import { chemicalElements } from '../data/chemical-elements';

@Injectable()
export class ChemicalElementsService {
  constructor(
    @InjectModel(ChemicalElement.name)
    private chemicalElementModel: Model<ChemicalElementDocument>,
  ) { }

  async populateDB() {
    await this.chemicalElementModel.deleteMany({}); // limpia colección
    await this.chemicalElementModel.insertMany(chemicalElements);
    return 'DB populated';
  }

  async findAll(): Promise<ChemicalElement[]> {
    return this.chemicalElementModel.find().exec();
  }

  async findOne(id: number): Promise<ChemicalElement | null> {
    return this.chemicalElementModel.findOne({ id }).exec();
  }

  findByNames(names: string[]) {
    return this.chemicalElementModel.find({ displayName: { $in: names } }).exec();
  }
}
