import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      
      host: process.env.db_host || 'postgres',
      port: parseInt(process.env.db_port, 10) || 5432,
      username: process.env.db_username || 'postgres',
      password: process.env.db_password || 'pass123',
      database: process.env.db_database || 'postgres',
      autoLoadEntities: true,
      synchronize: false,
    }),
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
