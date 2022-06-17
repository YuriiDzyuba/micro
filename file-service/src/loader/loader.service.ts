import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { AvatarType } from "../avatar/types/avatar.type";
import { ConfigService } from "@nestjs/config";
import { S3 } from 'aws-sdk';
import slugify from "slugify";

@Injectable()
export class LoaderService {
  private readonly awsS3AccessKey;
  private readonly awsS3Name;
  private readonly awsS3region;
  private readonly awsS3secretKey;
  constructor(
      private readonly configService: ConfigService
  ) {
    this.awsS3AccessKey = this.configService.get('serviceHost');
    this.awsS3Name = this.configService.get('servicePort');
    this.awsS3region = this.configService.get('accessJwtSecret');
    this.awsS3secretKey = this.configService.get('awsS3secretKey');
  }

  async uploadNewImageToAWSs3(
      file: AvatarType,
      imageCategory: string,
  ): Promise<any> {
    const { originalname, mimetype } = file;

    const s3 = this.getS3();
    const linkToImage = this.pathBuilder(
        originalname,
        'file',
        imageCategory,
    );

    const params = {
      Bucket: this.awsS3Name,
      Key: linkToImage,
      Body: file.buffer,
      ContentType: mimetype,
    };

    return s3
        .upload(params)
        .promise()
        .catch((err) => {
          throw new HttpException(
              `${err.message} can't upload image`,
              HttpStatus.SERVICE_UNAVAILABLE,
          );
        })
        .then((data) => data);
  }

  private getS3() {
    return new S3({
      region: this.awsS3region,
      accessKeyId: this.awsS3AccessKey,
      secretAccessKey: this.awsS3AccessKey,
    });
  }

  private pathBuilder(fileName, folderName, category) {
    return `${folderName}/${category}/${this.getUniqueFileName(fileName)}`;
  }

  private getUniqueFileName(originalName: string): string {
    const fileNameArr = originalName.split('.');
    const fileExtension = fileNameArr.pop();
    const fileName = fileNameArr[0];

    return (
        slugify(fileName + '-' + this.createUniqueString(), {
          lower: true,
          remove: /[*+~.()'"!:@]/g,
        }) +
        '.' +
        fileExtension
    );
  }

  private createUniqueString (): string {
    return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}
