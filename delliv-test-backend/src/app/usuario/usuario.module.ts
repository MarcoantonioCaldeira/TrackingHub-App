import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService], // Adicione aqui todos os serviços utilizados no módulo
})
export class UsuarioModule {}
