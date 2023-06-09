import Color from "../shared/color";
import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { WatchBackground } from "../model/watchFace.bips.model";
  
export default function draw(
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    background: WatchBackground) {
    if (!background) return
    if (background.color && Color.GFG_Fun(background.color)) {
        ctx.fillStyle = background.color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    if (background?.image?.json?.ImageIndex >= 0) {
        const img = findImageById(background.image.json.ImageIndex, images)
        if (img) {
            ctx.drawImage(img, background.image.json.X, background.image.json.Y);
        }
    }
    if (background?.frontImage?.json?.ImageIndex) {
        const img = findImageById(background.frontImage?.json.ImageIndex, images)
        if (img) {
            ctx.drawImage(img, background.frontImage?.json.X, background.frontImage?.json.Y);
        }
    }

}
