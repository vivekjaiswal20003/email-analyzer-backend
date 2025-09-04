"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mailparser_1 = require("mailparser");
const email_schema_1 = require("./schemas/email.schema");
const esp_detector_1 = require("./utils/esp-detector");
let EmailService = EmailService_1 = class EmailService {
    emailModel;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(emailModel) {
        this.emailModel = emailModel;
    }
    async analyzeHeader(header) {
        try {
            const parsed = await (0, mailparser_1.simpleParser)(header);
            this.logger.debug('Parsed email object:', JSON.stringify(parsed, null, 2));
            return parsed;
        }
        catch (error) {
            this.logger.error('Error parsing header:', error.stack);
            throw new Error('Failed to parse email header.');
        }
    }
    async saveEmail(rawEmail, parsedEmail) {
        const espType = (0, esp_detector_1.detectEspType)(parsedEmail);
        this.logger.debug(`Detected ESP Type: ${espType}`);
        const createdEmail = new this.emailModel({
            raw: rawEmail,
            parsed: parsedEmail,
            receivingChain: parsedEmail.headerLines.filter(h => h.key === 'received').map(h => h.line),
            espType: espType,
        });
        return createdEmail.save();
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(email_schema_1.Email.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmailService);
//# sourceMappingURL=email.service.js.map