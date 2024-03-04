import { Component } from "@angular/core";
import { Select } from '@ngxs/store';
import { ElevationChartStore } from "../state/elevation-chart.state";
import { Observable } from "rxjs";

@Component({
    selector: 'elevation-average',
    templateUrl: './elevation-average.component.html',
})
export class ElevationAverageComponent {
    @Select(ElevationChartStore.averageElevation)
    public averageElevation$: Observable<number>;
}