import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/common/database/database.module';

import { ChatPublicController } from './controllers/chat.public.controller';
import { ChatService } from './services/chat.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ChatPublicController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule {}
