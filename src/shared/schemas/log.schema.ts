import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LogType {
  Error = `error`,
}

@Schema({ timestamps: true })
export class Log extends Document {
  @Prop()
  content!: string;

  @Prop()
  type!: LogType;
}

export const LogSchema = SchemaFactory.createForClass(Log);
