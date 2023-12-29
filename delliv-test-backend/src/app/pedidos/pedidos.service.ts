import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CriarPedidoDto } from './dto/pedido.dto';
import { Pedido } from '@prisma/client';

@Injectable()
export class PedidoService {
private readonly logger = new Logger(PedidoService.name);

  constructor(private readonly prisma: PrismaService) {}

  async criarPedido(usuarioId: string, criarPedidoDto: CriarPedidoDto): Promise<{ mensagem: string, pedido: Pedido }> {
    const statusPermitidos = ['1', '2', '3'];

    if (!statusPermitidos.includes(criarPedidoDto.status)) {
      throw new BadRequestException('Status inválido. Deve ser 1, 2 ou 3.');
    }

    try {
      const usuarioIdNumber = parseInt(usuarioId, 10);
      const pedido = await this.prisma.pedido.create({
        data: {
          nome_cliente: criarPedidoDto.nome_cliente,
          endereco_cliente: criarPedidoDto.endereco_cliente,
          status: criarPedidoDto.status,
          usuarioId: usuarioIdNumber,
        },
      });

      return {
        mensagem: 'Pedido criado com sucesso',
        pedido,
      };
    } catch (error) {
      this.logger.error(`Erro ao criar pedido: ${error.message}`, error.stack);
      throw new HttpException('Erro ao criar pedido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async atualizarPedidoPorStatus(pedidoId: number, novoStatus: string) {
    // Certifique-se de que pedidoId seja um número
    const pedidoID = parseInt(pedidoId.toString(), 10);
    if (typeof pedidoID !== 'number' || isNaN(pedidoID)) {
      throw new BadRequestException('ID do pedido inválido.');
    }
  
    const pedido = await this.prisma.pedido.findUnique({
      where: {
        id: pedidoID,
      },
    });
  
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${pedidoID} não encontrado.`);
    }
  
    return this.prisma.pedido.update({
      where: { id: pedidoID },
      data: { status: novoStatus },
    });
  }
  
  async pegarTodosPedidos(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany();
  }
}