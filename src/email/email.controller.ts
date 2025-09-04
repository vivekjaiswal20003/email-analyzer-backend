import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { AnalyzeHeaderDto } from './dto/analyze-header.dto';

@Controller('emails')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(private readonly emailService: EmailService) {}

  @Post('analyze')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async analyzeHeader(@Body() analyzeHeaderDto: AnalyzeHeaderDto) {
    this.logger.log(`Received request to analyze header.`);
    const { header } = analyzeHeaderDto;
    try {
      const parsedEmail = await this.emailService.analyzeHeader(header);
      await this.emailService.saveEmail(header, parsedEmail);
      this.logger.log(`Header analyzed and saved successfully.`);
      return parsedEmail;
    } catch (error) {
      this.logger.error(`Error analyzing or saving header: ${error.message}`, error.stack);
      throw error;
    }
  }
}
