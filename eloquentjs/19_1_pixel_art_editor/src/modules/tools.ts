import * as Picture_Utils from './picture_utils'
import { Pixel } from './picture_utils';
function draw(pos: any, state: any, dispatch: Function) {

    function drawPixel({x, y}: any, state: any) {
        let drawn = {x, y, color: state.color};
        dispatch({picture: state.picture.draw([drawn])})
    }

    drawPixel(pos, state);
    return drawPixel;
}

function rectangle(start: any, state: any, dispatch: any) {
    function drawRectangle(pos: any) {
      let xStart = Math.min(start.x, pos.x);
      let yStart = Math.min(start.y, pos.y);
      let xEnd = Math.max(start.x, pos.x);
      let yEnd = Math.max(start.y, pos.y);
      let drawn = <Array<Pixel>>[];
      for (let y = yStart; y <= yEnd; y++) {
        for (let x = xStart; x <= xEnd; x++) {
          drawn.push(<never>{x, y, color: state.color});
        }
      }
      dispatch({picture: Picture_Utils.draw(drawn, state.picture)});
    }
    drawRectangle(start);
    return drawRectangle;
}


export { draw, rectangle } 
