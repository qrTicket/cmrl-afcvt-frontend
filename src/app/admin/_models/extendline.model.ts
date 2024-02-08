import { Line } from './lines.model';
import { Station } from './station.model';

export class Extend {
    id: number;
    line: Line;
    source: Station;
    destination: Station;
}