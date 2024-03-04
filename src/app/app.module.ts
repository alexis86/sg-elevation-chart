import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { EvaluationChartComponent } from './elevation-chart/evaluation-chart-component/evaluation-chart.component';
import { NgxsModule } from '@ngxs/store';
import { ElevationChartStore } from './elevation-chart/state/elevation-chart.state';
import { ElevationAverageComponent } from './elevation-chart/elevation-average-component/elevation-average.component';
import { MaxAverageComponent } from './elevation-chart/max-average/max-average.component';


@NgModule({
    declarations: [
        AppComponent,
        EvaluationChartComponent,
        ElevationAverageComponent,
        MaxAverageComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        NgxsModule.forRoot([ElevationChartStore], { developmentMode: true }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }