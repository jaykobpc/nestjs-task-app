import { IsNotEmpty } from 'class-validator';

export class GetLabelFilterDto {
  @IsNotEmpty()
  fieldName: string;
}
