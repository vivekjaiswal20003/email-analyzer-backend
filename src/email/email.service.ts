import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { simpleParser } from 'mailparser';
import { Email, EmailDocument } from './schemas/email.schema';
import { detectEspType } from './utils/esp-detector';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(@InjectModel(Email.name) private emailModel: Model<EmailDocument>) {}

  async analyzeHeader(header: string): Promise<any> {
    try {
      const parsed = await simpleParser(header);
      this.logger.debug('Parsed email object:', JSON.stringify(parsed, null, 2));
      return parsed;
    } catch (error) {
      this.logger.error('Error parsing header:', error.stack);
      throw new Error('Failed to parse email header.');
    }
  }

  async saveEmail(rawEmail: string, parsedEmail: any): Promise<EmailDocument> {
    const espType = detectEspType(parsedEmail);
    this.logger.debug(`Detected ESP Type: ${espType}`);

    const createdEmail = new this.emailModel({
      raw: rawEmail,
      parsed: parsedEmail,
      receivingChain: parsedEmail.headerLines.filter(h => h.key === 'received').map(h => h.line),
      espType: espType,
    });
    return createdEmail.save();
  }
}
