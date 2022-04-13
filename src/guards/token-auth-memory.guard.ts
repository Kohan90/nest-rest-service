import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Address, UserPublicKey } from '@elrondnetwork/erdjs';
import { GlobalService } from 'src/services/global.service';

@Injectable()
export class TokenAuthMemoryGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();

    const tokenHeader: string         = request.headers['authorization'];
    const signatureHeader: string     = request.headers['signature'];

    if (tokenHeader && signatureHeader){
      const token           = tokenHeader.replace('Bearer ', '');
      const signature       = signatureHeader.replace('Bearer ', '');
      
      const pubKey = await GlobalService.globalMap.get(token);
      
      if (pubKey) {
        //Check signature
        const erdAddress = new Address(pubKey);
        
        const userPub   = new UserPublicKey(erdAddress.pubkey());
        
        const isVerified = userPub.verify(Buffer.from(token, 'base64'), Buffer.from(signature, 'base64'));

        if (isVerified) {
          // Delete the one time token from Redis
          await GlobalService.globalMap.delete(token);

          return true;
        }
      }
    }

    return false;
  }
}
