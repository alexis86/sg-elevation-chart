import { Injectable } from '@angular/core';
import { Observable, from, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ElevationChartModel } from '../models/elevation-chart.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private readonly http: HttpClient) { }

    loadChartData(): Observable<ElevationChartModel[]> {
        const loadChartDataUrl =
            `${environment.apiUrl}arcgis/rest/services/Tools/ElevationSync/GPServer/Profile/execute`;

        const DEMResolutionInMeters = 90;

        const queryParameters = {
            InputLineFeatures: JSON.stringify(
                {
                    fields: [{ name: "OID", type: "esriFieldTypeObjectID", alias: "OID" }],
                    geometryType: "esriGeometryPolyline",
                    features: [{
                        geometry: {
                            paths: [[[10.464200935945678, 45.51541916225363], [11.021070442780866, 45.881334972376145]]],
                            spatialReference: { wkid: 4326 }
                        },
                        attributes: { OID: 1 }
                    }],
                    sr: { wkid: 4326 }
                }
            ),
            ProfileIDField: "OID",
            DEMResolution: `${DEMResolutionInMeters}m`,
            MaximumSampleDistance: 425.5644849862203,
            MaximumSampleDistanceUnits: "Meters",
            returnZ: true,
            returnM: true,
            f: "json"
        }

        return this.http.get(loadChartDataUrl, {
            params: queryParameters
        })
            .pipe(
                map((chartData: any) => {
                    console.log(chartData);

                    const paths: number[][] =
                        chartData?.results[0]?.value?.features[0]?.geometry?.paths[0];

                    return paths.map((path) => {
                        console.log(path);
                        return { elevation: path[2], distance: path[3] };
                    });

                }));

    }
}