import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CreateUserRequest } from './dto/create-user.request.dto';
import { UserCreatedEvent } from './events/user.created';
import fs from "fs"
@Injectable()
export class AppService {




  constructor(private readonly eventEmitter: EventEmitter2,
    private readonly schedulerRegistry: SchedulerRegistry) { }
  private readonly logger = new Logger(AppService.name);

  async createUser(body: CreateUserRequest) {
    this.logger.log('Creating user...', body);
    const userId = '123';
    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(userId, body.email),
    );
    const establishWsTimeout = setTimeout(
      () => this.establishWsConnection(userId),
      5000,
    );
    this.schedulerRegistry.addTimeout(
      `${userId}_establish_ws`,
      establishWsTimeout,
    );
  }

  private establishWsConnection(userId: string) {
    this.logger.log('Establishing WS connection with user...', userId);
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(event: { user: string, email: string }) {
    this.logger.log('User created event', event);
  }
  // when event is emitted, this method will be called
  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: UserCreatedEvent) {
    this.logger.log('Sending welcome gift...', payload.email);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    console.log("sending email to " + payload.email);


    this.logger.log('Welcome gift sent.', payload.email);
  }




  // @cron decorator is a useful tool for 
  // scheduling tasks to run at specific intervals
  //  in a NestJS application. It can be used to automate 
  // repetitive tasks or to perform periodic maintenance and 
  // cleanup tasks.  
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'delete_expired_users' })
  deleteExpiredUsers() {
    this.logger.log('Deleting expired users...');
  }
  
  aysnc createUser(email:string,password:string):Promise<User>{
  
      return await user.save(email)
  
  }


}
