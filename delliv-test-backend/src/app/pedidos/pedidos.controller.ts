import { Controller, Get, Param, Post, Body, Patch, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsuarioService } from '../usuario/usuario.service';
import { PedidoService } from './pedidos.service';
import { CriarPedidoDto } from './dto/pedido.dto';
import { Pedido } from '@prisma/client';

@Controller('pedidos')
export class PedidoController {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly pedidoService: PedidoService,
  ) {}

  // @Get('listar/:usuarioId')
  // async pegarPedidosPorUsuario(usuarioId: number) { 

  //   try {

  //     const pedidos = await this.usuarioService.pegarPedidosDoUsuarioPorId(usuarioId);
  //     return pedidos;

  //   } catch (error) {
  //     throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Get('listar')
  async pegarTodosPedidos() {
    try {
      const todosPedidos = await this.pedidoService.pegarTodosPedidos();
      return todosPedidos;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':usuarioId/criar')
  async criarPedido(@Param('usuarioId') userId: number, @Body() criarPedidoDto: CriarPedidoDto): Promise<{ mensagem: string, pedido: Pedido } | { mensagem: string }> {
    try {
      const resposta = await this.pedidoService.criarPedido(userId.toString(), criarPedidoDto);
      return {
        mensagem: 'Pedido criado com sucesso',
        pedido: resposta.pedido,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Patch(':id/status')
  async atualizarPedidoPorStatus(@Param('id') pedidoId: number, @Body('status') novoStatus: string) {
    try {
      const pedidoAtualizado = await this.pedidoService.atualizarPedidoPorStatus(pedidoId, novoStatus);
      return {
        mensagem: 'Status do pedido atualizado com sucesso',
        pedido: pedidoAtualizado,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
