import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '@prisma/client';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}


  @Post('cadastrar')
  async cadastrarUsuario(@Body() usuarioData: { nome: string, email: string, senha: string }): Promise<{ mensagem: string, usuario: Usuario }> {
    try {
      const resposta = await this.usuarioService.cadastrarUsuario(usuarioData);
      return resposta;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('login')
  async login(@Body() credentials: { email: string, senha: string }): Promise<{ accessToken: string }> {
    const usuario = await this.usuarioService.validarUsuario(credentials.email, credentials.senha);
    try{
      if (!usuario) {
        throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
      }else{
        const accessToken = await this.usuarioService.gerarTokenDeAcesso(usuario);
        return { accessToken };
      }
    }catch(error){
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}