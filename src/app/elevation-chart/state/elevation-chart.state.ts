import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from '../../services/api.service';
import { tap } from 'rxjs/operators';
import { LoadElevationChartData } from './elevation-chart.actions';
import { ElevationChartModel } from '../../models/elevation-chart.model';

interface ElevationChartState {
    chartData: ElevationChartModel[];
}

@State<ElevationChartState>({
    name: 'ElevationChart',
    defaults: { chartData: [] }
})
@Injectable()
export class ElevationChartStore {
    constructor(private readonly api: ApiService) { }

    @Selector()
    static elevationChartData(state: ElevationChartState): ElevationChartModel[] {
        return state.chartData;
    }

    @Selector()
    static averageElevation(state: ElevationChartState): number {
        if (!state.chartData.length) {
            return 0;
        }

        const elevationSum = state.chartData.reduce((result, current) => {
            result += current.elevation;
            return result;
        }, 0);

        return elevationSum / state.chartData.length;
    }

    @Selector()
    static maxElevation(state: ElevationChartState): number {
        if (!state.chartData.length) {
            return 0;
        }

        const elevationSum = state.chartData.reduce((result, current) => {
            if (result < current.elevation) {
                return current.elevation;
            }

            return result;
        }, 0);

        return elevationSum;
    }


    @Action(LoadElevationChartData)
    loadElevationChartData({ patchState, dispatch }: StateContext<ElevationChartState>, { }: LoadElevationChartData) {

        return this.api.loadChartData().pipe(
            tap(chartData => {
                patchState({ chartData });
            })
        );
    }
}