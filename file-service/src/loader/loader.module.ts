import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';
import {ConfigModule} from "@nestjs/config";
import config from "./config/loader.config";

@Module({
  imports: [ ConfigModule.forFeature(config) ],
  providers: [LoaderService],
})
export class LoaderModule {}
