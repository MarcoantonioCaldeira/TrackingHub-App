import { Module } from '@nestjs/common';
import { UsuarioModule } from './app/usuario/usuario.module'; 
import { PedidoModule } from './app/pedidos/pedidos.module';
import { PrismaService } from './database/PrismaService';


@Module({
  imports: [
    UsuarioModule,
    PedidoModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
