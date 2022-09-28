import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const Token = createParamDecorator((data: string, ctx: ExecutionContext) => {
  try {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    return token;
  } catch (err) {
    throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
  }
});
