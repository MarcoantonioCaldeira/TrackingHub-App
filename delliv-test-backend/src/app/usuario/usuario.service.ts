import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, Optional  } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService'; 
import { Pedido, Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly jwtService: JwtService,
  ) {}


  async cadastrarUsuario(usuarioData: { nome: string, email: string, senha: string }): Promise<{ mensagem: string, usuario: Usuario }> {
    const hashedPassword = await bcrypt.hash(usuarioData.senha, 10);

    try {
      const usuario = await this.prisma.usuario.create({
        data: {
          nome: usuarioData.nome,
          email: usuarioData.email,
          senha: hashedPassword,
        },
      });

      return {
        mensagem: 'Usuário cadastrado com sucesso',
        usuario,
      };
    } catch (error) {
      throw new HttpException('Erro ao cadastrar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 

  // async pegarPedidosDoUsuarioPorId(usuarioId: number): Promise<Pedido[]> {
  //   if (!usuarioId || isNaN(usuarioId)) {
  //     throw new HttpException('Usuário inválido', HttpStatus.BAD_REQUEST);
  //   }
  
  //   return this.prisma.pedido.findMany({
  //     where: { usuarioId },
  //   });
  // }


  async validarUsuario(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });

    if (usuario && (await this.compararSenha(senha, usuario.senha))) {
      return usuario;
    }

    return null;
  }

  private async compararSenha(senha: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(senha, hashedPassword);
  }

  async gerarTokenDeAcesso(user: Usuario): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}