import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: any): Promise<any> {
    console.log("++++++++++++++++++++++++++++++")
    console.log(data)
    return data;
  }
}

