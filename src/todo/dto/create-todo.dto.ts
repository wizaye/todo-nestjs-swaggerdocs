import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty ,IsOptional,IsString} from 'class-validator';
export class CreateTodoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    task:string;
    @ApiProperty()
    @IsOptional()
    @IsString() 
    description:string;

}
