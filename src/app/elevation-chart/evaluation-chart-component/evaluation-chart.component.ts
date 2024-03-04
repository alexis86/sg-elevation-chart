import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from '@ngxs/store';
import { ElevationChartStore } from "../state/elevation-chart.state";
import { LoadElevationChartData } from './../state/elevation-chart.actions';
import { Observable, Subject, takeUntil } from "rxjs";
import Chart from 'chart.js/auto';
import { ElevationChartModel } from "../../models/elevation-chart.model";

@Component({
    selector: 'evaluation-chart',
    templateUrl: './evaluation-chart.component.html',
})
export class EvaluationChartComponent implements OnInit, OnDestroy {
    private unsubscribeSubject$ = new Subject<void>();

    public chart: any;

    @Select(ElevationChartStore.elevationChartData)
    public elevationChartData$: Observable<ElevationChartModel[]>;

    constructor(private store: Store) { }

    ngOnDestroy(): void {
        this.unsubscribeSubject$.next();
        this.unsubscribeSubject$.complete();
    }

    ngOnInit(): void {
        this.store.dispatch(LoadElevationChartData);
        this.elevationChartData$?.pipe(
            takeUntil(this.unsubscribeSubject$)
        )
            .subscribe((elevationChartData) => {
                this.createChart(elevationChartData);
            });
    }

    private createChart(elevationChartData: ElevationChartModel[]) {
        this.chart?.destroy();

        this.chart = new Chart('ElevationChart', {
            type: 'line',
            options: {
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return `${value} m`;
                            }
                        },
                        title: {
                            align: "center",
                            display: true,
                            text: "Elevation, m"
                        }

                    },
                    x: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return `${value} m`;
                            }
                        },
                        title: {
                            align: "center",
                            display: true,
                            text: "Distance, m"
                        }

                    }
                }
            },
            data: {
                labels: elevationChartData.map((chartItem) => chartItem.distance),
                datasets: [
                    {
                        label: 'Chart',
                        data: elevationChartData.map((chartItem) => chartItem.elevation),
                    },
                ],
            }
        });
    }
}