import { IImage } from "../model/image.model";
import {  WatchTimeAnalog } from "../model/watchFace.bips.model";
import { WatchState } from "../model/watchState";
import { findImageById } from "../shared/helper";
import drawClockHand from "./clockHand.element";

    export default function drawTimeAnalog(ctx: CanvasRenderingContext2D, 
        images: IImage[],
        time: WatchTimeAnalog,
        watchState: WatchState
        ) {
        if ( !time) return
        if (time.ampm.enabled) {
            if (watchState.hours < 12) {
                let img = findImageById(time.ampm.json.ImageIndexAMEN, images)
                if (img) {
                    let x = time.ampm.json.X 
                    let y = time.ampm.json.Y
                    ctx.drawImage(img, x, y)
                }
            } else {
                let img = findImageById(time.ampm.json.ImageIndexPMEN, images)
                if (img) {
                    let x = time.ampm.json.X 
                    let y = time.ampm.json.Y
                    ctx.drawImage(img, x, y)
                }
            }
        }
        if ( time.hours?.enabled) {
            if ( watchState.hours < 12)
                drawClockHand(ctx, images, time.hours, watchState.hours, 12 )
            else 
                drawClockHand(ctx, images, time.hours, watchState.hours-12, 12  )
        }
        if ( time.minutes?.enabled) {
            drawClockHand(ctx, images, time.minutes, watchState.minutes, 60  )
        }
        if ( time.seconds?.enabled) {
            drawClockHand(ctx, images, time.seconds, watchState.seconds, 60  )
        }
        
    }
