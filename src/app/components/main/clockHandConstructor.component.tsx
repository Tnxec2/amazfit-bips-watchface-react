import { FC, useContext, useState } from "react";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { ClockHand } from "../../model/json.bips.model";
import Color from "../../shared/color";
import Canvas from "./canvas.function";
import cl from "./previewComponent.module.css";

interface IProps {
  width: number;
  height: number;
}

const scaleFactor = 2

const ClockhandConstructorComponent: FC<IProps> = ({ width, height }) => {
  const { watchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const [type, setType] = useState<number>(1);

  const [whiteBackground, setWhiteBackground] = useState<boolean>(true);

  function draw(canvas, ctx: CanvasRenderingContext2D) {
    if (watchface) {
      if (canvas) {
        const color = whiteBackground ?  'white' : 'black';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx)
        const clockhand = type === 3 ? watchface.analogTime.seconds.json : type === 2 ? watchface.analogTime.minutes.json : type === 1 ? watchface.analogTime.hours.json : null
        drawclockhand(clockhand, width, height, ctx)
      } else {
        console.error("don't find canvas with id canvasClockhandPreview");
      }
    }
  }

  function drawGrid(ctx: CanvasRenderingContext2D) {

    const stroke = "gray";
    const step = 10;
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

  function getCursorPosition(event) {
    const canvas = document.getElementById(
      "canvasClockhandPreview"
    ) as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = width / scaleFactor - Math.round(Math.min(width, Math.max(0, Math.round(x))) / scaleFactor);
    y = height / scaleFactor - Math.round(Math.min(height, Math.max(0, Math.round(y))) / scaleFactor);
    setX(x);
    setY(y);
  }

  return (
    <>
      <div className={cl.canvasCcontainer}>

      <div className="container d-flex justify-content-center">
        <div>
          <div
            className="input-group input-group-sm"
            style={{ width: "max-content" }}
          >              
            <label className="form-check-label">
              Clockhand&nbsp;
            </label>
            { watchface.analogTime.hours.enabled ?
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale1" value="1" checked={type===1} onChange={() => {setType(1)}} />
              <label className="form-check-label" htmlFor="inlineRadio1">Hours</label>
            </div> 
            : <></> }
            { watchface.analogTime.minutes.enabled ?
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale2" value="2" checked={type===2} onChange={() => {setType(2)}} />
              <label className="form-check-label" htmlFor="inlineRadio2">Minutes</label>
            </div>
            : <></> }
            { watchface.analogTime.seconds.enabled ?
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale3" value="3" checked={type===3} onChange={() => {setType(3)}} />
              <label className="form-check-label" htmlFor="inlineRadio3">Seconds</label>
            </div>
            : <></>}
          </div>
        </div>
        
      </div>
        <div>
          x: {x}, y: {y}
        </div>
        <Canvas
          id="canvasClockhandPreview"
          draw={draw}
          className={cl.canvasPreview}
          width={width*scaleFactor}
          height={height*scaleFactor}
          onClick={getCursorPosition}
          scaleFactor={scaleFactor}
        />

<div className="container d-flex justify-content-center">
        <div>
          <div
            className="input-group input-group-sm"
            style={{ width: "max-content" }}
          >
            <span className="input-group-text" id="addon-wrapping">
              White background
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={whiteBackground}
                onChange={() => setWhiteBackground(true)}
              />
            </div>
            <span className="input-group-text" id="addon-wrapping">
              Black background
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={!whiteBackground}
                onChange={() => setWhiteBackground(false)}
              />
            </div>
            
          </div>
        </div>
      </div>
      </div>

    </>
  );
};

export default ClockhandConstructorComponent;

interface ICoords {
  x: number,
  y: number,
}

function drawclockhand(clockHand: ClockHand, width: number, height: number, ctx: CanvasRenderingContext2D,) {
  if (!clockHand) return

  const points: ICoords[] = []
  const center: ICoords = {x: width / 2, y: height / 2}

  clockHand.Shape?.forEach(c => {
      points.push({x: c.X, y: c.Y})
  })

  let color = Color.colorRead(clockHand.Color)
  if ( Color.GFG_Fun(color)) {
    
    ctx.strokeStyle = color;
    //if ( !clockHand.OnlyBorder ) ctx.fillStyle = color;

    ctx.save(); // saves the coordinate system
    ctx.translate(center.x, center.y); // now the position (0,0) is found at (250,50)

    const angle = -90
    
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
    if ( !clockHand.OnlyBorder ) {
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.restore()
  }
}