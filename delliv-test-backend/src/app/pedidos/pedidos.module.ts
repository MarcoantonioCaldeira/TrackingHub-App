import { Module } from '@nestjs/common';
import { PedidoController } from './pedidos.controller';
import { PedidoService } from './pedidos.service';
import { PrismaService } from '../../database/PrismaService';
import { UsuarioModule } from '../usuario/usuario.module'
import { UsuarioService } from '@app/usuario/usuario.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService, UsuarioService, PrismaService], 
  imports: [UsuarioModule], 
})

export class PedidoModule {}
