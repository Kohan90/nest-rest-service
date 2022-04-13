/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateTokenDto } from './dto/createToken.dto';
import {AuthService} from './auth.service';
import { TokenAuthRedisGuard } from 'src/guards/token-auth-redis.guard';
import { TokenAuthMemoryGuard } from 'src/guards/token-auth-memory.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/token-memory')
    async createInMemory(@Body() createTokenDto: CreateTokenDto) {
        return await this.authService.createInMemory(createTokenDto);
    }

    @Post('/token-redis')
    async create(@Body() createTokenDto: CreateTokenDto) {
        return await this.authService.createInRedis(createTokenDto);
    }

    @UseGuards(TokenAuthRedisGuard)
    @Post('/credentials')
    async credentials(@Request() req ) {
        return await this.authService.generateCredentials();
    }

    @UseGuards(TokenAuthMemoryGuard)
    @Post('/credentials-memory')
    async credentialsMemory(@Request() req ) {
        return await this.authService.generateCredentials();
    }
}   
