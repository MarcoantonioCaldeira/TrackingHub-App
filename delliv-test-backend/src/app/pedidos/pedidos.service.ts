import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CriarPedidoDto } from './dto/pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  async criarPedido(userId: number, criarPedidoDto: CriarPedidoDto) {
    return this.prisma.pedido.create({
      data: {
        nome_cliente: criarPedidoDto.nome_cliente,
        endereco_cliente: criarPedidoDto.endereco_cliente,
        status: criarPedidoDto.status ? criarPedidoDto.status.toString() : '1',
        usuarioId: userId, 
      },
    });
  }

  async atualizarPedidoPorStatus(pedidoId : number, novoStatus: string) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id: pedidoId  } });

    if (!pedido) {
      throw new NotFoundException(`Peido com ID ${pedidoId } não encontrado.`);
    }

    return this.prisma.pedido.update({
      where: { id: pedidoId  },
      data: { status: novoStatus },
    });  
  }
}