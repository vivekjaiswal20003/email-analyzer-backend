import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  @Prop({ required: true })
  raw: string;

  @Prop({ type: Object }) // Store parsed email as a generic object
  parsed: any;

  @Prop([String]) // Array of strings for receiving chain
  receivingChain: string[];

  @Prop({ type: String, default: 'Unknown' }) // New property for ESP type
  espType: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
