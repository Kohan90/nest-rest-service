import { TokenAuthGuard } from './token-auth-redis.guard';

describe('TokenAuthGuard', () => {
  it('should be defined', () => {
    expect(new TokenAuthGuard()).toBeDefined();
  });
});
