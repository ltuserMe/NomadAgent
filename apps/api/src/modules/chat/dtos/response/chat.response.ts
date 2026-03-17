import { ApiProperty } from '@nestjs/swagger';

export class ChatAskResponseDto {
    @ApiProperty({
        description: 'AI的回答内容',
        example: '你好，我是 NestJS 重构后的 AI。你问的是："你好，请介绍一下NestJS"。',
    })
    answer: string;

    @ApiProperty({
        description: '请求状态',
        example: 'success',
    })
    status: string;
}

export class ChatHistoryResponseDto {
    @ApiProperty({
        description: '消息ID',
        example: 'clxxxxxx',
    })
    id: string;

    @ApiProperty({
        description: '消息角色',
        enum: ['user', 'assistant'],
        example: 'user',
    })
    role: string;

    @ApiProperty({
        description: '消息内容',
        example: '你好，请介绍一下NestJS',
    })
    content: string;

    @ApiProperty({
        description: '创建时间',
        example: '2026-03-16T10:00:00.000Z',
    })
    createdAt: Date;
}
