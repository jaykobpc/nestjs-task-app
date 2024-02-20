import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsNotEmpty()
  @IsString()
  labelName: string;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  labelColor: string;
}
