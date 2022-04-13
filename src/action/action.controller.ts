import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { TokenAuthRedisGuard } from 'src/guards/token-auth-redis.guard';
import { TokenAuthMemoryGuard } from 'src/guards/token-auth-memory.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ActionService } from './action.service';
import { TokenDto } from 'src/auth/dto/token.dto';

@Controller('action')
export class ActionController {
    constructor(private readonly actionService: ActionService) { }

    @UseGuards(TokenAuthRedisGuard)
    @Post('/redis')
    async action(@Body() token: TokenDto, @Request() req ) {
        return await this.actionService.action();
    }

    @UseGuards(TokenAuthMemoryGuard)
    @Post('/memory')
    async actionInMemory(@Body() token: TokenDto, @Request() req ) {
        return await this.actionService.action();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/credentials')
    async credentialsAction(@Request() req ) {
        return await this.actionService.credentialsAction();
    }
}
