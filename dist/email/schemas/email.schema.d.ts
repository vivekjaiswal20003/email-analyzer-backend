import { Document } from 'mongoose';
export type EmailDocument = Email & Document;
export declare class Email {
    raw: string;
    parsed: any;
    receivingChain: string[];
    espType: string;
    createdAt: Date;
}
export declare const EmailSchema: import("mongoose").Schema<Email, import("mongoose").Model<Email, any, any, any, Document<unknown, any, Email, any, {}> & Email & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Email, Document<unknown, {}, import("mongoose").FlatRecord<Email>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Email> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
