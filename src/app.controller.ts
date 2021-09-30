import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('eventBus')
  async helloBus(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('=============> helloBus pattern recieved', data);
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    return { dataFromEmiiter: data, dataListner: 'listned' };
  }
}
