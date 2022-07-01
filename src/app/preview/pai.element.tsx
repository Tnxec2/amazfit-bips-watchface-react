import { IImage } from "../model/image.model";
import {  WatchPai } from "../model/watchFace.bips.model";
import drawDigitImage from "./digitImage.element";
import drawImage from "./image.element";

export function drawPai(
    ctx: CanvasRenderingContext2D,
    images: IImage[],
    pai: WatchPai,
    paiValue: number,
    drawBorder: boolean,
    noData: boolean
    ) {
    if (noData) {
        if (pai.imageNoData.enabled) {
            drawImage(ctx, images, pai.imageNoData.json)
        }
        return
    }
    if (pai.numberGeneral.enabled) {
        drawDigitImage(ctx, images, pai.numberGeneral, paiValue, drawBorder, 1)
    }
    if (paiValue <= 70) {
        if ( pai.numberLow.enabled) drawDigitImage(ctx, images, pai.numberLow, paiValue, drawBorder, 1)
        if ( pai.imageLow.enabled) drawImage(ctx, images, pai.imageLow.json)
    } else if (paiValue <= 100) {
        if (pai.numberNormal.enabled) drawDigitImage(ctx, images, pai.numberNormal, paiValue, drawBorder, 1)
        if ( pai.imageNormal.enabled) drawImage(ctx, images, pai.imageNormal.json)
    } else if (paiValue > 100) {
        if (pai.numberHigh.enabled) drawDigitImage(ctx, images, pai.numberHigh, paiValue, drawBorder, 1)
        if ( pai.imageHigh.enabled) drawImage(ctx, images, pai.imageHigh.json)
    }
    
}