import { EmailService } from './email.service';
import { AnalyzeHeaderDto } from './dto/analyze-header.dto';
export declare class EmailController {
    private readonly emailService;
    private readonly logger;
    constructor(emailService: EmailService);
    analyzeHeader(analyzeHeaderDto: AnalyzeHeaderDto): Promise<any>;
}
