import { Model } from 'mongoose';
import { EmailDocument } from './schemas/email.schema';
export declare class EmailService {
    private emailModel;
    private readonly logger;
    constructor(emailModel: Model<EmailDocument>);
    analyzeHeader(header: string): Promise<any>;
    saveEmail(rawEmail: string, parsedEmail: any): Promise<EmailDocument>;
}
