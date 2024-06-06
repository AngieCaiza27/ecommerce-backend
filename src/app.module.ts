import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';


@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123',
      database: 'ecommerce_db',
      entities: [__dirname +'/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}



