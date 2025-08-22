import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema()
export class History {
    @Prop({ required: true })
    sensorId: string;

    @Prop({ required: true })
    sensorType: string;

    @Prop({ required: true })
    value: number;

    @Prop({ required: true })
    dateTime: Date;

    @Prop({ required: true })
    locationId: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);