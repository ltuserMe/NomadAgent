import {
    ChatAskResponseDto,
    ChatHistoryResponseDto,
} from '../dtos/response/chat.response';

export interface IChatService {
    saveMessage(
        userId: string,
        role: 'user' | 'assistant',
        content: string
    ): Promise<any>;
    getChatHistory(userId,limit?: number): Promise<ChatHistoryResponseDto[]>;
}
