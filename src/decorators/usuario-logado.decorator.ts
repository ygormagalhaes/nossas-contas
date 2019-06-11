import { createParamDecorator } from '@nestjs/common';

export const UsuarioLogado = createParamDecorator((data, req) => {
    return req.user;
});
