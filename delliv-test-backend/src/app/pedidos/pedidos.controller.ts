import { Controller, Get, Param, Post, Body, Patch, UseGuards, Request } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsuarioService } from '../usuario/usuario.service';
import { PedidoService } from './pedidos.service';
import { CriarPedidoDto } from './dto/pedido.dto';

@Controller('pedidos')
//@UseGuards(JwtAuthGuard)
export class PedidoController {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly pedidoService: PedidoService,
  ) {}

  @Get()
  async pegarPedidosPorUsuario(@Request() req) {
    const usuario = req.usuario;
    return this.usuarioService.pegarPedidosDoUsuarioPorId(usuario.id);
  }

  @Post()
  async criarPedido(@Request() req, @Body() criarPedidoDto: CriarPedidoDto) {
    const usuario = req.usuario;
    return this.pedidoService.criarPedido(usuario.id, criarPedidoDto);
  }


  @Patch(':id/status')
  async atualizarPedidoPorStatus(
    @Param('id') pedidoId: number,
    @Body('status') novoStatus: string, // Alterado para número
  ) {
    return this.pedidoService.atualizarPedidoPorStatus(pedidoId, novoStatus);
  }
  
}
