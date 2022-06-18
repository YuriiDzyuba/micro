import { Module } from '@nestjs/common';
import {ImageService} from "./image.service";

@Module({
    imports: [
      //  ConfigModule.forFeature(config),
    ],
    providers: [ImageService]
})
export class ImageModule {}