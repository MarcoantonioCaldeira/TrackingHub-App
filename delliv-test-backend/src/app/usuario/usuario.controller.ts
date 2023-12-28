import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '@prisma/client';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  async login(@Body() credentials: { email: string, senha: string }): Promise<{ accessToken: string }> {
    const usuario = await this.usuarioService.validarUsuario(credentials.email, credentials.senha);

    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    //const accessToken = await this.usuarioService.gerarTokenDeAcesso(usuario);
    return { accessToken: null };
  }
}