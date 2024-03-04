import { Component } from "@angular/core";
import { Select } from '@ngxs/store';
import { ElevationChartStore } from "../state/elevation-chart.state";
import { Observable } from "rxjs";

@Component({
    selector: 'max-average',
    templateUrl: './max-average.component.html',
})
export class MaxAverageComponent {
    @Select(ElevationChartStore.maxElevation)
    public maxElevation$: Observable<number>;
}