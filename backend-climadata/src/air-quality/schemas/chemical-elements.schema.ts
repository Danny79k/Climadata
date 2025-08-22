import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChemicalElementDocument = ChemicalElement & Document;

@Schema()
export class RiskLevel {
  @Prop() low: number;
  @Prop() moderate: number;
  @Prop() high: number;
  @Prop() riskDescription: string;
}

const RiskLevelSchema = SchemaFactory.createForClass(RiskLevel);

@Schema()
export class ChemicalElement {
  @Prop({ type: Number, required: true }) id: number;
  @Prop({ required: true }) displayName: string;
  @Prop() unit: string;
  @Prop() info: string;
  @Prop({ type: RiskLevelSchema }) riskLevel: RiskLevel;  // <- objeto único
}

export const ChemicalElementSchema = SchemaFactory.createForClass(ChemicalElement);
