import { FC, useContext, useState } from "react";
import { IImagesContext, ImagesContext } from "../../context/images.context";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { IWatchStateContext, WatchStateContext } from "../../context/watchstate.context";
import { IImage } from "../../model/image.model";
import { WatchActivityList } from "../../model/watchFace.bips.model";
import { WatchState } from "../../model/watchState";
import { drawActivity } from "../../preview/activity.element";
import drawActivitysAlt from "../../preview/activityAlt.element";
import drawBackground from "../../preview/background.element";
import { drawBattery } from "../../preview/battery.element";
import { drawCalorieProgress } from "../../preview/calorieProgress.element";
import drawDate, { drawDateExt, drawWeekdayIconProgress } from "../../preview/date.element";
import { drawPai } from "../../preview/pai.element";
import { drawPulseProgress } from "../../preview/pulseProgress.element";
import drawStatus from "../../preview/status.element";
import { drawStepProgress } from "../../preview/stepProgress.element";
import drawTimeAnalog from "../../preview/timeAnalog.element";
import drawTimeDigital from "../../preview/timeDigital.element";
import { drawWeather } from "../../preview/weather.element";
import Canvas from "./canvas.function";
import cl from "./previewComponent.module.css";

interface IProps {
  width: number;
  height: number;
}

const storage_items = {
  preview_white_grid: "preview_white_grid",
  preview_black_grid: "preview_black_grid",
  preview_digit_border: "preview_digit_border",
  preview_shortcut_border: "preview_shortcut_border",
  preview_scale_factor: "preview_scale_factor",
};

const PreviewComponent: FC<IProps> = ({ width, height }) => {
  const { watchface } =
    useContext<IWatchContext>(WatchfaceContext);
  const { images } =
    useContext<IImagesContext>(ImagesContext);
  const { watchState } =
    useContext<IWatchStateContext>(WatchStateContext);

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [whiteGrid, setWhiteGrid] = useState<boolean>(
    localStorage.getItem(storage_items.preview_white_grid)
      ? JSON.parse(localStorage.getItem(storage_items.preview_white_grid))
      : false
  );
  const [blackGrid, setBlackGrid] = useState<boolean>(
    localStorage.getItem(storage_items.preview_black_grid)
      ? JSON.parse(localStorage.getItem(storage_items.preview_black_grid))
      : false
  );
  const [digitBorder, setDigitBorder] = useState<boolean>(
    localStorage.getItem(storage_items.preview_digit_border)
      ? JSON.parse(localStorage.getItem(storage_items.preview_digit_border))
      : false
  );
  const [scaleFactor, setScaleFactor] = useState<number>(
    localStorage.getItem(storage_items.preview_scale_factor)
      ? JSON.parse(localStorage.getItem(storage_items.preview_scale_factor))
      : 1
  );

  function draw(canvas, ctx: CanvasRenderingContext2D) {
    if (images && watchface) {
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNormal(canvas, ctx, images);
        drawGrid(ctx);
      } else {
        console.error("don't find canvas with id canvasPreview");
      }
    }
  }

  function drawNormal(canvas, ctx: CanvasRenderingContext2D, images: IImage[]) {
    if (watchface.background)
      drawBackground(canvas, ctx, images, watchface.background);
    if (watchface.date) {
      drawDate(ctx, images, watchface.date, watchState, digitBorder);
    }
    if (watchface.dateExtended) {
      drawDateExt(ctx, images, watchface.dateExtended, watchState, digitBorder);
    }
    if (watchface.weekdayicon) {
      drawWeekdayIconProgress(ctx, images, watchface.weekdayicon, watchState);
    }
    if (watchface.status) {
      drawStatus(ctx, images, watchface.status, watchState);
    }
    if (watchface.battery) {
      drawBattery(
        ctx,
        images,
        watchface.battery,
        watchState,
        digitBorder,
      );
    }
    if (watchface.weather) {
      drawWeather(
        ctx,
        images,
        watchface.weather,
        watchState,
        digitBorder
      );
    }
    if (watchface.activity) {
      drawActivitys(
        ctx,
        images,
        watchface.activity,
        watchState,
        digitBorder,
      );
    }
    if (watchface.pai) {
      drawPai(
        ctx,
        images,
        watchface.pai,
        watchState.pai,
        digitBorder,
      );
    }
    if (watchface.caloriesProgress) {
      drawCalorieProgress(
        ctx,
        images,
        watchface.caloriesProgress,
        watchState.calories,
        watchState.caloriesGoal
      );
    }
    if (watchface.activityAlt)
      drawActivitysAlt(ctx, images, watchface.activityAlt, watchState, digitBorder)
    if (watchface.stepsProgress) {
      drawStepProgress(
        ctx, 
        images, 
        watchface.stepsProgress,
        watchState,
        digitBorder,
      )
    }
    if (watchface.pulseProgress) {
      drawPulseProgress(
        ctx, 
        images, 
        watchface.pulseProgress,
        watchState,
      )
    }
    if (watchface.time) {
      drawTimeDigital(ctx, images, watchface.time, watchState, digitBorder);
      drawTimeAnalog(ctx, images, watchface.analogTime, watchState);
    }
  }

  function getCursorPosition(event) {
    const canvas = document.getElementById(
      "canvasPreview"
    ) as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / scaleFactor;
    let y = (event.clientY - rect.top) / scaleFactor;
    x = Math.min(width, Math.max(0, Math.round(x)));
    y = Math.min(height, Math.max(0, Math.round(y)));
    setX(x);
    setY(y);
  }

  function onToggleWhiteGrid() {
    const wg = !whiteGrid;
    setWhiteGrid(wg);
    localStorage.setItem(storage_items.preview_white_grid, JSON.stringify(wg));
  }

  function onToggleBlackGrid() {
    const bg = !blackGrid;
    setBlackGrid(bg);
    localStorage.setItem(storage_items.preview_white_grid, JSON.stringify(bg));
  }

  function onToggleDigitBorder() {
    const db = !digitBorder;
    setDigitBorder(db);
    localStorage.setItem(
      storage_items.preview_digit_border,
      JSON.stringify(db)
    );
  }
  

  function drawGrid(ctx: CanvasRenderingContext2D) {
    if (!whiteGrid && !blackGrid) return;
    const stroke = whiteGrid ? "white" : "black";
    const step = 20;
    for (let i = width / 2; i > 0; i -= step) {
      drawLine(ctx, [i, 0], [i, height], stroke, 1);
    }
    for (let i = width / 2; i < width; i += step) {
      drawLine(ctx, [i, 0], [i, height], stroke, 1);
    }
    for (let i = height / 2; i > 0; i -= step) {
      drawLine(ctx, [0, i], [width, i], stroke, 1);
    }
    for (let i = height / 2; i < height; i += step) {
      drawLine(ctx, [0, i], [width, i], stroke, 1);
    }
    drawLine(ctx, [width / 2 - 1, 0], [width / 2 - 1, height], stroke, 2);
    drawLine(ctx, [0, height / 2 - 1], [width, height / 2 - 1], stroke, 2);
  }

  function drawLine(
    ctx: CanvasRenderingContext2D,
    begin: [number, number],
    end: [number, number],
    stroke = "black",
    width = 1
  ) {
    if (stroke) {
      ctx.strokeStyle = stroke;
    }

    if (width) {
      ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(begin[0], begin[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  }

  return (
    <>
      <div className={cl.canvasCcontainer}>
        "Screen Normal"
        <div>
          x: {x}, y: {y}
        </div>
        <Canvas
          id="canvasPreview"
          draw={draw}
          className={cl.canvasPreview}
          width={width*scaleFactor}
          height={height*scaleFactor}
          onClick={getCursorPosition}
          scaleFactor={scaleFactor}
        />
      </div>

      <div className="container d-flex justify-content-center">
        <div>
          <div
            className="input-group input-group-sm"
            style={{ width: "max-content" }}
          >
            <span className="input-group-text" id="addon-wrapping">
              White grid
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={whiteGrid}
                onChange={onToggleWhiteGrid}
              />
            </div>
            <span className="input-group-text" id="addon-wrapping">
              Black grid
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={blackGrid}
                onChange={onToggleBlackGrid}
              />
            </div>
            <span className="input-group-text" id="addon-wrapping">
              border on digit
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={digitBorder}
                onChange={onToggleDigitBorder}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div>
          <div
            className="input-group input-group-sm"
            style={{ width: "max-content" }}
          >              
            <label className="form-check-label">
              Scale&nbsp;
            </label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale1" value="1" checked={scaleFactor===1} onChange={() => {setScaleFactor(1)}} />
              <label className="form-check-label" htmlFor="inlineRadio1">x1</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale2" value="2" checked={scaleFactor===2} onChange={() => {setScaleFactor(2)}} />
              <label className="form-check-label" htmlFor="inlineRadio2">x2</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale3" value="3" checked={scaleFactor===3} onChange={() => {setScaleFactor(3)}} />
              <label className="form-check-label" htmlFor="inlineRadio3">x3</label>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default PreviewComponent;

function drawActivitys(
  ctx: CanvasRenderingContext2D,
  images: IImage[],
  activitylist: WatchActivityList,
  watchState: WatchState,
  digitBorder: boolean
) {
  drawActivity(
    ctx,
    images,
    activitylist.steps,
    watchState.steps,
    digitBorder
  );
  drawActivity(
    ctx,
    images,
    activitylist.calories,
    watchState.calories,
    digitBorder
      );
  drawActivity(
    ctx,
    images,
    activitylist.distance,
    watchState.distance,
    digitBorder
  );
  drawActivity(
    ctx,
    images,
    activitylist.pulse,
    watchState.hearthrate,
    digitBorder
  );
  
}
