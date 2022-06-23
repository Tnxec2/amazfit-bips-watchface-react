import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { LinearIconSet } from "../model/json.bips.model";

export default function drawLinearIconSet(
    ctx: CanvasRenderingContext2D,
    images: IImage[], 
    iconSet: LinearIconSet,
    value: number,
    total: number) {
        if (iconSet?.StartImageIndex && iconSet?.Segments) {
            
            if (value > total) value = total
            
            let count = iconSet.Segments?.length

            if (count) {
                let end = Math.floor(value / (total / count))

                end = Math.min(end, count)

                for(let i = 0; i < end; i++) {
                    if (iconSet.StartImageIndex+i > images.length) return // BipS draw only exist images
                    console.log(i, end, value, total);
                    
                    const img = findImageById(iconSet.StartImageIndex + i, images)
                    if (img) ctx.drawImage(img, iconSet.Segments[i].X, iconSet.Segments[i].Y);
                }
            }
        }
}