/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/createToken.dto';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import { sign } from 'jsonwebtoken'; 
import { GlobalService } from 'src/services/global.service';

@Injectable()
export class AuthService {
    private client      = new Redis();
    
    constructor(
	) {
        if (!GlobalService.globalMap) {
            GlobalService.globalMap = new Map();
        }
     }

     /**
      * 
      * @param createTokenDto 
      * @returns 
      */
    async createInMemory(createTokenDto: CreateTokenDto): Promise<any> {
        const uniqueToken = uuidv4();
        
        GlobalService.globalMap.set(uniqueToken, createTokenDto.client_id);

        return {token: uniqueToken};
    }

    /**
     * 
     * @param createTokenDto 
     * @returns 
     */
    async createInRedis(createTokenDto: CreateTokenDto): Promise<any> {
          const uniqueToken = uuidv4();

          this.client.set(uniqueToken, createTokenDto.client_id);

          return {token: uniqueToken};
    }
    
    /**
     * 
     * @returns 
     */
    async generateCredentials() {
        return {jwt: sign(uuidv4(), process.env.JWT_SECRET)};
    }
}
