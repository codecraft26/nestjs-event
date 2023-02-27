import { Controller, Get ,Post,Body} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequest } from './dto/create-user.request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() body: CreateUserRequest): Promise<void> {
    return this.appService.createUser(body);
  }
}
