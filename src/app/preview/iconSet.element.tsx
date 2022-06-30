import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { IconSet } from "../model/json.bips.model";

export default function drawIconSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    iconSet: IconSet,
    value: number,
    total: number) {
        if (iconSet?.ImageIndex) {
            let x = iconSet.X ? iconSet.X : 0
            let y = iconSet.Y ? iconSet.Y : 0

            if (value > total) value = total
            
            let count = iconSet.ImagesCount ? iconSet.ImagesCount : 1

            let index = Math.floor(value / (total / count))

            index = Math.max(index, 0)
            index = Math.min(index, iconSet.ImagesCount-1)

            const img = findImageById(iconSet.ImageIndex + index, images)
            if (img) ctx.drawImage(img, x, y);
        }
}