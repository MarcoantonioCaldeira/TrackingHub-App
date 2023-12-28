import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Injectable  } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService'; 
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async pegarPedidosDoUsuarioPorId(usuarioId: number) {
    return this.prisma.pedido.findMany({
      where: { usuarioId },
    });
  }

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