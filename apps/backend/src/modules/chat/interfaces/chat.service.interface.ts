import { ChatAskResponseDto, ChatHistoryResponseDto } from '../dtos/response/chat.response';

export interface IChatService {
    saveMessage(role: 'user' | 'assistant', content: string): Promise<any>;
    getChatHistory(limit?: number): Promise<ChatHistoryResponseDto[]>;
}
