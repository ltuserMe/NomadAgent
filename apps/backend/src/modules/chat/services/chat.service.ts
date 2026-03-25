import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/services/database.service';
import { ChatHistoryResponseDto } from '../dtos/response/chat.response';
import { IChatService } from '../interfaces/chat.service.interface';

@Injectable()
export class ChatService implements IChatService {
    // 依赖注入数据库服务
    constructor(private readonly databaseService: DatabaseService) {}

    /**
     * 保存对话消息到数据库
     */
    async saveMessage(userId:string, role: 'user' | 'assistant', content: string) {
        return this.databaseService.chatMessage.create({
            data: {
                role,
                content,
                userId
            },
        });
    }

    /**
     * 获取最近的聊天历史（用于给 AI 提供上下文）
     */
    async getChatHistory(userId:string, limit = 10): Promise<ChatHistoryResponseDto[]> {
        return this.databaseService.chatMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            
        });
    }
}
