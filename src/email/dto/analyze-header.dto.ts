import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeHeaderDto {
  @IsString()
  @IsNotEmpty()
  header: string;
}
