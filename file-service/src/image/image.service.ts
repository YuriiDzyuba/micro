import { Injectable } from '@nestjs/common';
import { Image } from "../Image/types/Image.type";
import * as path from "path";

@Injectable()
export class ImageService {
    async prepareImage(image: Image, imageFilter = ''): Promise<Image> {
        switch (imageFilter) {
            case 'sepia':
                return this._sepiaImage(image);
            case 'pink':
                return this._pinkImage(image);
            case 'black':
                return this._blackImage(image);
            case 'multi':
                return this._multiImage(image);
            default:
                return this._resizeImage(image);
        }
    }


    async _resizeImage(image: Image): Promise<Image> {
        image.buffer = await sharp(image.buffer)
            .resize(333, 333)
            .sharpen()
            .toBuffer();
        return image;
    }

    async _sepiaImage(image: Image): Promise<Image> {
        image.buffer = await sharp(image.buffer)
            .resize(333, 333)
            .composite([
                {
                    input: path.join(__dirname + '/../../static/photoFilters/sepia.png'),
                    gravity: 'southeast',
                    blend: 'multiply',
                },
            ])
            .sharpen()
            .toBuffer();
        return image;
    }

    async _pinkImage(image: Image): Promise<Image> {
        image.buffer = await sharp(image.buffer)
            .resize(333, 333)
            .composite([
                {
                    input: path.join(__dirname + '/../../static/photoFilters/pink.png'),
                    gravity: 'southeast',
                    blend: 'multiply',
                },
            ])
            .sharpen()
            .toBuffer();
        return image;
    }

    async _blackImage(image: Image): Promise<Image> {
        image.buffer = await sharp(image.buffer)
            .resize(333, 333)
            .grayscale()
            .sharpen()
            .toBuffer();
        return image;
    }

    async _multiImage(image: Image): Promise<Image> {
        image.buffer = await sharp(image.buffer)
            .resize(333, 333)
            .composite([
                {
                    input: path.join(__dirname + '/../../static/photoFilters/multi.png'),
                    gravity: 'southeast',
                    blend: 'multiply',
                },
            ])
            .sharpen()
            .toBuffer();
        return image;
    }
}
