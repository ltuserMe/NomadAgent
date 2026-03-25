import { Controller, Post, Body, Get, Query, HttpStatus } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { PublicRoute } from 'src/common/request/decorators/request.public.decorator';
import { DocResponse } from 'src/common/doc/decorators/doc.response.decorator';
import { ChatService } from '../services/chat.service';
import { ChatAskDto } from '../dtos/request/chat.ask.request';
import {
    ChatAskResponseDto,
    ChatHistoryResponseDto,
} from '../dtos/response/chat.response';
import { AuthUser } from 'src/common/request/decorators/request.user.decorator';
import { IAuthUser } from 'src/common/request/interfaces/request.interface';
import { LoggerHelpers } from 'src/common/logger/services/logger.service';
import { PinoLogger } from 'nestjs-pino';

@ApiTags('public.chat')
@Controller({
    path: '/chat',
    version: '1',
})
export class ChatPublicController {
    constructor(
        private readonly chatService: ChatService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(ChatPublicController.name);
    }

    /**
     * 模拟 AI 问答接口
     */
    @Post('ask')
    // @PublicRoute()
    @ApiBearerAuth('accessToken')
    @ApiOperation({ summary: 'AI问答接口', description: '向AI提问并获取回答' })
    @DocResponse({
        serialization: ChatAskResponseDto,
        httpStatus: HttpStatus.OK,
        messageKey: 'chat.success.asked',
    })
    async ask(
        @AuthUser() { userId }: IAuthUser,
        @Body() body: ChatAskDto
    ): Promise<ChatAskResponseDto> {
        // LoggerHelpers.logBusinessEvent(this.logger, 'chat_ask_called', {
        //     userId,
        // });
        // 1. 存入用户提问
        await this.chatService.saveMessage(userId, 'user', body.question);
        

        // 2. 这里模拟调用你原来的 AI 逻辑（如 OpenAI 或 LangChain）
        const mockAiResponse = `你问的是："${body.question}"。`;

        // 3. 存入 AI 回答
        await this.chatService.saveMessage(userId, 'assistant', mockAiResponse);

        return {
            answer: mockAiResponse,
            status: 'success',
        };
    }

    /**
     * 获取历史记录接口
     */
    @Get('history')
    // @PublicRoute()
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: '获取聊天历史',
        description: '获取最近的聊天历史记录',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: '返回记录数量限制',
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description: '获取历史记录成功',
        type: [ChatHistoryResponseDto],
    })
    async getHistory(
        @AuthUser() { userId }: IAuthUser,
        @Query('limit') limit?: string
    ): Promise<ChatHistoryResponseDto[]> {
        return this.chatService.getChatHistory(
            userId,
            limit ? parseInt(limit) : 10
        );
    }
}
