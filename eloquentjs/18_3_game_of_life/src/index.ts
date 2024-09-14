import * as Grid_Utils from './grid_utils'
import { Grid } from './grid_utils';
import * as Runtime_Utils from './runtime'

let gridContainer: HTMLDivElement = document.getElementById("gridContainer") as HTMLDivElement;
let populatedGrid: HTMLDivElement = Grid_Utils.generateGrid(gridContainer, 50);

Runtime_Utils.runGameOfLife(populatedGrid, 50);
