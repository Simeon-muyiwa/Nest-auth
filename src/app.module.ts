// connection.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createConnection } from 'typeorm';

@Injectable()
export class ConnectionService implements OnModuleInit {
  async onModuleInit() {
    try {
      await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'default_user',
        password: process.env.POSTGRES_PASSWORD || 'default_password',
        database: process.env.POSTGRES_DB || 'default_db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}