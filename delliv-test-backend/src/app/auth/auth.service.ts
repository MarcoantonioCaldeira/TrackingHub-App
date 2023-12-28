import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(usuario: Usuario) {
    
    const isValid = await this.validarUsuario(usuario.email, usuario.senha);

    if (!isValid) {
      throw new UnauthorizedException('Email ou senha invalidos');
    }

    const payload = { sub: usuario.id, email: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validarUsuario(email: string, senha: string): Promise<boolean> {
    const user = await this.usuarioService.validarUsuario(email, senha);
    return !!user;
  }
}
