import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { ImageSet } from "../model/json.bips.model";

export default function drawImageSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    imageSet: ImageSet,
    value: number,
    total: number,
    fixCounterStepProgress?: boolean) {
        if (imageSet?.ImageIndex) {
            let x = imageSet.X ? imageSet.X : 0
            let y = imageSet.Y ? imageSet.Y : 0

            if (value > total) value = total
            
            let count = imageSet.ImagesCount ? imageSet.ImagesCount : 1

            let index = Math.floor(value / (total / count))
            
            //index = Math.max(index, 0)
            if (fixCounterStepProgress) index -= 1;
            if (index < 0) return;

            index = Math.min(index, imageSet.ImagesCount-1-(fixCounterStepProgress? 1 : 0))

            const img = findImageById(imageSet.ImageIndex + index, images)
            if (img) ctx.drawImage(img, x, y);
        }
}