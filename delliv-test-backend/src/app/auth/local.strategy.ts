import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(nome: string, senha: string): Promise<any> {
    const usuario = await this.authService.validarUsuario(nome, senha);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
