import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatAskDto {
    @ApiProperty({
        description: '用户提问内容',
        example: '你好，请介绍一下NestJS',
    })
    @IsString()
    @IsNotEmpty()
    question: string;
}
