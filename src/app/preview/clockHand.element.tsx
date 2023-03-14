import { findImageById } from "../shared/helper";
import { IImage } from "../model/image.model";
import { WatchClockHand } from "../model/watchFace.bips.model";
import Color from "../shared/color";

interface ICoords {
    x: number,
    y: number,
}
export default function drawclockhand(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    clockHand: WatchClockHand, 
    value: number, 
    total: number ) {

    if (total === null || clockHand.json.Shape?.length === 0) return

    const points: ICoords[] = []
    const center: ICoords = {x: clockHand.json.Center?.X ? clockHand.json?.Center?.X : 0, y: clockHand.json?.Center?.Y ? clockHand.json.Center?.Y : 0}

    clockHand.json?.Shape?.forEach(c => {
        points.push({x: c.X, y: c.Y})
    })

    let color = Color.colorRead(clockHand.json.Color)
    if ( Color.GFG_Fun(color)) {
        
        ctx.strokeStyle = color;
        if ( !clockHand.json.OnlyBorder ) ctx.fillStyle = color;

        ctx.save(); // saves the coordinate system
        ctx.translate(center.x, center.y); // now the position (0,0) is found at (250,50)

        const angle = (value * 360 / total) - 90

        
        ctx.rotate((Math.PI/180) * angle); // rotate around the start point of your line
        // Draw shape
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        //ctx.lineTo(points[0].x, points[0].y);
        ctx.closePath();
        ctx.stroke();
        if ( !clockHand.json.OnlyBorder ) ctx.fill();
        ctx.restore()
        
        if (clockHand.json?.CenterImage?.ImageIndex >= 0) {
            let x = clockHand.json.CenterImage?.X ? clockHand.json.CenterImage.X : 0
            let y = clockHand.json.CenterImage?.Y ? clockHand.json.CenterImage.Y : 0
            let img = findImageById(clockHand.json.CenterImage.ImageIndex, images)
            if ( img ) ctx.drawImage(img, x, y);
        }
    }
    
}
