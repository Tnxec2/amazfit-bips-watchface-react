import { findImageById } from "../shared/helper"
import { IImage } from "../model/image.model"

import { WatchCoordinates, WatchNumber, WatchNumberExt } from "../model/watchFace.bips.model"
import { AlignmentType } from "../model/types.bips.model"

export interface DigitValueItem {
    snumber: string,
    prefix?: number,
    suffix?: number,
    dataType?: number
}

export function drawDigitsOneLine(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digit: WatchNumber, 
    number: string[], 
    delimiter?: number,
    drawBorder?: boolean,
    suffix?: number,
    prefix?: number,
    minus?: number,
    appendSuffixToAll?: boolean
): void {
    const x =  digit.json?.TopLeftX ? digit.json?.TopLeftX : 0 
    const y =  digit.json?.TopLeftY ? digit.json?.TopLeftY : 0 
    const bottomx = digit.json?.BottomRightX ? digit.json?.BottomRightX : x
    const bottomy = digit.json?.BottomRightY ? digit.json?.BottomRightY : y 

    if (digit.json.ImageIndex) {

        let ar: HTMLImageElement[] = []

        let delImg = null
        if (delimiter) delImg = findImageById(delimiter, images)

        let prefixImg = null
        if (prefix) prefixImg = findImageById(prefix, images)

        let suffixImg = null
        if (suffix) suffixImg = findImageById(suffix, images)

        if (prefixImg) ar.push(prefixImg)
        number.forEach((n, index) => {
            ar = ar.concat(getImages(images, n, 
                digit.json.ImageIndex, 
                digit.json.ImagesCount,
                null,
                minus
                ))
            if (appendSuffixToAll && suffixImg) ar.push(suffixImg)
            if (delImg && index < number.length - 1) ar.push(delImg)
        });
        if (!appendSuffixToAll && suffixImg) ar.push(suffixImg)
        drawImages(ctx, ar, x, y, bottomx, bottomy, digit.json.Spacing, 0,
            digit.json.Alignment, drawBorder)
    }
}

export default function drawDigitImage(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digit: WatchNumber, 
    number: number, 
    drawBorder?: boolean,
    paddingLength: number = 1,
    minus?: number,
    prefix?: number,
    decimalPointer?: number,
    suffix?: number,
    suffixKM?: number,
    noDataImageIndex?: number,
    altCoords?: WatchCoordinates
    )  {

    
    const x = altCoords ? (altCoords.json?.X ? altCoords.json.X : 0) : (digit.json?.TopLeftX ? digit.json?.TopLeftX : 0)
    const y = altCoords ? (altCoords.json?.Y ? altCoords.json.Y : 0) : (digit.json?.TopLeftY ? digit.json?.TopLeftY : 0)
    const bottomx = altCoords ? (x+digit.width) : (digit.json?.BottomRightX ? digit.json?.BottomRightX : 0 )
    const bottomy = altCoords ? (y+digit.height) : (digit.json?.BottomRightY ? digit.json?.BottomRightY : 0)

    if (digit.json.ImageIndex>= 0) {

        let ar: HTMLImageElement[] = []
        if (noDataImageIndex) {
            const img = findImageById(noDataImageIndex, images)
            if (img) { ar.push(img) }
        } else {
            let strNumber = number.toString()
            if ( paddingLength > strNumber.length ) {
                strNumber = strNumber.padStart(paddingLength, '0')
            }
            if (number < 0) strNumber = (-number).toString()


            if (prefix) {
                const img = findImageById(prefix, images)
                if (img) { ar.push(img) }
            }
            if (number < 0 && minus) {
                const img = findImageById(minus, images)
                if (img) { ar.push(img) }
            }
            ar = ar.concat(getImages(images, strNumber, 
                    digit.json.ImageIndex, 
                    digit.json.ImagesCount,
                    decimalPointer
                    ))
            if (decimalPointer && suffixKM) {
                const img = findImageById(suffixKM, images)
                if (img) { ar.push(img) }
            } else if (suffix) {
                const img = findImageById(suffix, images)
                if (img) { ar.push(img) }
            }
        }
        drawImages(ctx, ar, x, y, bottomx, bottomy, digit.json.Spacing, 0,
            digit.json.Alignment, drawBorder)
    }
}


export function drawDigitExtendedImage(
    ctx: CanvasRenderingContext2D, 
    images: IImage[], 
    digit: WatchNumberExt, 
    number: number, 
    drawBorder?: boolean,
    paddingLength: number = 1,
    minus?: number,
    prefix?: number,
    decimalPointer?: number,
    suffix?: number,
    suffixKM?: number,
    ) {

        
    const x = digit.json?.TopLeftX ? digit.json?.TopLeftX : 0 
    const y = digit.json?.TopLeftY ? digit.json?.TopLeftY : 0 
    const bottomx =  digit.json?.BottomRightX ? digit.json?.BottomRightX : 0 
    const bottomy =  digit.json?.BottomRightY ? digit.json?.BottomRightY : 0 

    if (digit.json.ImageIndex) {
        let strNumber = number.toString()
        if ( paddingLength > strNumber.length ) {
            strNumber = strNumber.padStart(paddingLength, '0')
        }
        if (number < 0) strNumber = (-number).toString()

        let ar: HTMLImageElement[] = []

        if (prefix) {
            const img = findImageById(prefix, images)
            if (img) { ar.push(img) }
        }
        if (number < 0 && minus) {
            const img = findImageById(minus, images)
            if (img) { ar.push(img) }
        }
        ar = ar.concat(getImages(images, strNumber, 
                digit.json.ImageIndex, 
                digit.json.ImagesCount,
                decimalPointer
                ))
        if (decimalPointer && suffixKM) {
            const img = findImageById(suffixKM, images)
            if (img) { ar.push(img) }
        } else if (suffix) {
            const img = findImageById(suffix, images)
            if (img) { ar.push(img) }
        }
   
        drawImages(ctx, ar, x, y, bottomx, bottomy, digit.json.Spacing, digit.json.VerticalOffset,
            digit.json.Alignment, drawBorder)

    }

}

function getImages(
    images: IImage[], 
    strNumber: string, 
    startImageIndex: number, 
    count: number, 
    decimalPointer: number,
    minus?: number): HTMLImageElement[] {
    const ar: HTMLImageElement[] = []
    for (let i = 0; i < strNumber.length; i++) {
        if (decimalPointer && i === strNumber.length - 2) {
            const img = findImageById(decimalPointer, images)
            if (img) { ar.push(img) }
        }
        var chr = strNumber.charAt(i);
        if ( chr === '-' ) {
            if (minus) {
                const img = findImageById(minus, images)
                if (img) { ar.push(img) }
            }
        } else {
            var n = parseInt(chr)
            if (!isNaN(n) && n < count) {
                const img = findImageById(startImageIndex + n, images)
                if (img) { ar.push(img) }
            } 
        }
    }
    return ar;
}

function drawImages(
    ctx: CanvasRenderingContext2D,
    ar: HTMLImageElement[], 
    startx: number, 
    starty: number, 
    endx: number,
    endy: number,
    spacing: number, 
    vspacing: number,
    alignment: string, 
    drawborder: boolean)  {
    if ( ar.length === 0) return
    
/*     if (!spacing) spacing = 0
    
    let imageWidth: number = 0
    let imageHeight: number = 0

    let top: number = starty
    let bottom: number = starty
    let _tempY: number = starty

    ar.forEach( (img, index) => {
        imageWidth += img.width
        imageWidth += spacing

        if ( ! vspacing) {
            if (img.height > imageHeight) imageHeight = img.height
        } else {
            if (index > 0) _tempY = _tempY + vspacing
            top = Math.min(top, _tempY)
            bottom = Math.max(bottom, _tempY + img.height)
        }
    })
    imageWidth -= spacing
    if ( vspacing ) imageHeight = bottom - top
    
    let  maxWidth = endx - startx
    let  maxHeight = endy - starty

    let x = startx
    let y = starty */
    // if (alignment === AlignmentType.Right.json || alignment === AlignmentType.TopRight.json || alignment === AlignmentType.CenterRight.json || alignment === AlignmentType.BottomRight.json ) { // right
    //     x = x + maxWidth - imageWidth
    // } else if (alignment === AlignmentType.Center.json || alignment === AlignmentType.TopCenter.json || alignment === AlignmentType.BottomCenter.json ) { // center
    //     x = x + maxWidth / 2 - imageWidth / 2
    // }

    // if (alignment === AlignmentType.Bottom.json || alignment === AlignmentType.BottomLeft.json || alignment === AlignmentType.BottomCenter.json || alignment === AlignmentType.BottomRight.json  ) { // bottom
    //     y = y + maxHeight - imageHeight
    // } else if (alignment === AlignmentType.Center.json || alignment === AlignmentType.CenterLeft.json || alignment === AlignmentType.CenterRight.json ) { // center
    //     y = y + maxHeight / 2 - imageHeight / 2
    // }

    const bounds = calculateBounds(ar, spacing)

    var x = 0
    var y = 0
    if (AlignmentType.hasFlag(AlignmentType.fromJson(alignment), AlignmentType.Left.index)) {
        x = startx
    } else if (AlignmentType.hasFlag(AlignmentType.fromJson(alignment), AlignmentType.Right.index)) {
        x = endx - bounds[0] + 1
    } else { 
        x = (startx + endx - bounds[0]) >> 1
    }

    if (AlignmentType.hasFlag(AlignmentType.fromJson(alignment), AlignmentType.Top.index)) {
        y = starty
    } else if (AlignmentType.hasFlag(AlignmentType.fromJson(alignment), AlignmentType.Bottom.index)) {
        y = endy - bounds[1] + 1
    } else {
        y = (starty + endy - bounds[1]) >> 1
    }
    if (x < startx)
        x = startx
    if (y < starty)
        y = starty
   

    ar.forEach(img => {
        ctx.drawImage(img, x, y);
        x += img.width
        if ( spacing ) x += spacing
        if ( vspacing ) y += vspacing
    })
    if ( drawborder) {
        ctx.beginPath();
        ctx.strokeStyle = 'gray'
        ctx.rect(startx, starty, endx - startx, endy-starty);
        ctx.stroke();
    }
}

function calculateBounds(images: HTMLImageElement[], spacing: number): number[] {
    var width = 0
    var height = 0

    for (const image of images) {
        let imageWidth = image.width
        let imageHeight = image.height

        width += imageWidth + spacing
        if (imageHeight > height)
            height = imageHeight
    }
    width -= spacing
    return [width, height]
}
