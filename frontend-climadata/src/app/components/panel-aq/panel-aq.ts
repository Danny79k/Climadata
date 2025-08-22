import { Component, computed, effect, OnInit, signal, untracked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AirQualityService } from '../../../services/air-quality.service';
import { tap } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GeolocationService } from '../../services/geoLocation/geoLocation';
import { MatButton } from '@angular/material/button';
import { Loading } from '../../lotties/loading/loading';

// Interfaces para acceder a campos de objetos
interface Sensor {
  id: number;
  name: string;
}

interface Measurement {
  id: number;
  value: string;
}

interface firstPositionElemts {
  sensor: any;
  measurements: any;
}

@Component({
  selector: 'app-panel-aq',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatProgressSpinnerModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatInput,
    MatAutocompleteModule,
    MatButton,
    Loading
  ],
  templateUrl: './panel-aq.html',
  styleUrls: ['./panel-aq.scss'],
})
export class PanelAq implements OnInit {

  // Señales reactivas para manejar el estado
  elemts = signal<any[]>([]); // Lista de elementos de calidad del aire
  localElemts = signal<any[]>([]); // Elementos filtrados por posición
  selectedId = signal<number | null>(null); // ID seleccionado por el usuario
  parameters = signal<any[]>([]); // Parámetros de sensores y mediciones
  loading = signal(false); // Estado de carga
  isPosition = signal(false); // Si se está usando la posición actual
  firstPositionElemts = signal<any[]>([]); // Datos del primer elemento por posición
  firstPosition = signal<number | null>(null); // ID del primer elemento por posición
  closestElement = signal<any[]>([]); // Elemento más cercano con datos procesados
  firstPositionName = signal("") // Nombre del primer elemento por posición
  leyendaElements = signal<any[]>([]); // Elementos químicos filtrados para la leyenda
  rejectionMessage = signal<string>("placeholder"); // Mensaje de rechazo (placeholder)

  inputValue = '' // Valor del input de búsqueda
  filteredRes: any[] = [] // Resultados filtrados por búsqueda

  // Efecto reactivo: cuando cambia firstPosition, se obtienen sus mediciones
  private firstPositionEffect = effect(() => {
    const pos = this.firstPosition();
    if (pos) {
      this.fetchFirstPositionMeasurements(pos);
    }
  });

  // Efecto reactivo: cuando hay datos en firstPositionElemts, se procesan para mostrar el elemento más cercano
  private closestPositionEffect = effect(() => {
    const elem = this.firstPositionElemts();
    if (elem && elem.length > 1) {
      untracked(() => this.showClosestPosition());
    }
  })

  constructor(
    private http: HttpClient,
    private airQualityService: AirQualityService,
    private geo: GeolocationService
  ) { }

  // Cambia a modo de búsqueda por posición (bbox) y obtiene datos
  togglePositionBbox() {
    console.log('se cambia a Bbox')
    this.isPosition.set(true)
    this.fetchFromPosition();
  }

  // Cambia a modo de búsqueda por defecto (todos los datos)
  togglePositionDefault() {
    console.log('se cambia a default');
    this.isPosition.set(false);
    this.fetchData();
  }

  // Inicializa el componente obteniendo los datos y activando el modo bbox
  ngOnInit() {
    this.fetchData();
    this.togglePositionBbox()
  }

  // Obtiene el bounding box (área) alrededor de la posición actual del usuario
  async processBoundingBox(): Promise<[number, number, number, number]> {
    return await this.geo.getCurrentPosition().then(position => {
      const { latitude, longitude } = position.coords;
      const bboxObj = this.getBoundingBox(latitude, longitude, 0.4);
      const bbox: [number, number, number, number] = [
        bboxObj.minLon,
        bboxObj.minLat,
        bboxObj.maxLon,
        bboxObj.maxLat
      ];
      console.log(bbox)
      return bbox;
    });
  }

  // Calcula los límites del bounding box a partir de lat/lon y delta
  getBoundingBox(lat: number, lon: number, delta: number) {
    return {
      minLat: lat - delta,
      maxLat: lat + delta,
      minLon: lon - delta,
      maxLon: lon + delta,
    };
  }

  // Obtiene los elementos de calidad del aire dentro del bounding box
  fetchFromPosition() {
    this.processBoundingBox().then(bbox => {
      this.airQualityService.sendBbox(bbox).subscribe({
        next: response => {
          console.log('Air Quality Data:', response);
          this.localElemts.set(response)
          this.firstPosition.set(response[0].id)
          this.firstPositionName.set(response[0].name)
          console.log(this.firstPosition())
        },
        error: (err) => console.error('Error al obtener datos:', err)
      });
    });
  }

  // Obtiene las mediciones del elemento seleccionado por posición
  fetchFirstPositionMeasurements(firstPosition: any) {
    this.airQualityService.fetchFromApiById(firstPosition).subscribe({
      next: (res) => {
        console.log(res);
        this.firstPositionElemts.set(Array.isArray(res) ? res : []);
        console.log(this.firstPositionElemts());
        console.log(this.firstPositionName());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Obtiene todos los elementos de calidad del aire (modo default)
  fetchData() {
    this.http.get<any[]>('http://localhost:3000/air-quality/locations').subscribe({
      next: (res) => {
        this.elemts.set(res)
        console.log(this.elemts())
      },
      error: (err) => console.error('Error al obtener datos:', err),
    }
    );
  }

  // Cuando el usuario selecciona un ID, obtiene los datos de sensores y mediciones
  onSelectId(id: number) {
    this.selectedId.set(id);
    this.loading.set(true);
    this.airQualityService
      .fetchFromApiById(id)
      .pipe(
        tap(() => this.loading.set(false))
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          const processableObject: any = res
          const dataSensors = processableObject[0] || [];
          const dataMeasurements = processableObject[1] || [];

          console.log("=== Sensors snapshot ===", dataSensors);
          console.log("=== Measurements snapshot ===", dataMeasurements);

          // Filtra y mapea los sensores
          const sensors = dataSensors.sensors
            .filter((item: any) => item.id && item.name)
            .map((s: any) => ({ ...s, id: Number(s.id) }));

          // Filtra y mapea las mediciones
          const measurements = dataMeasurements.measurements
            .filter((item: any) => item.sensorsId)
            .map((m: any) => ({ ...m, sensorsId: Number(m.sensorsId) }));

          // Empareja sensores con sus mediciones
          const paired = sensors.map((sensor: any) => {
            const measurement = measurements.find((m: any) => m.sensorsId === sensor.id);
            return {
              name: sensor.parameter.displayName || sensor.name,
              units: sensor.parameter.units || 'unknown',
              value: measurement ? measurement.value : null
            };
          });

          console.log("=== Paired snapshot ===", paired);

          this.parameters.set(paired);
          console.log(this.parameters())
          this.fetchElements(paired.map((item: any) => item.name));
        },
        error: (err) => {
          console.error('Error:', err);
          this.parameters.set([]);
          this.loading.set(false);
        },
      });
  }

  // Filtra los elementos por el valor del input de búsqueda
  filter() {
    const input = this.inputValue.toLowerCase();
    this.filteredRes = this.elemts().filter(elemt => elemt.name.toLowerCase().includes(input))
    console.log(this.filteredRes)
  }

  // Procesa los datos del elemento más cercano y los empareja (sensores/mediciones)
  showClosestPosition() {
    // Captura el snapshot para evitar cambios reactivos
    const allData = structuredClone(this.firstPositionElemts());

    console.log("=== RAW allData ===", allData);

    const dataSensors = allData[0] || [];
    const dataMeasurements = allData[1] || [];

    console.log("=== Sensors snapshot ===", dataSensors);
    console.log("=== Measurements snapshot ===", dataMeasurements);

    // Filtra y mapea los sensores
    const sensors = dataSensors.sensors
      .filter((item: any) => item.id && item.name)
      .map((s: any) => ({ ...s, id: Number(s.id) }));

    // Filtra y mapea las mediciones
    const measurements = dataMeasurements.measurements
      .filter((item: any) => item.sensorsId)
      .map((m: any) => ({ ...m, sensorsId: Number(m.sensorsId) }));

    // Empareja sensores con sus mediciones
    const paired = sensors.map((sensor: any) => {
      const measurement = measurements.find((m: any) => m.sensorsId === sensor.id);
      return {
        name: sensor.parameter.displayName || sensor.name,
        units: sensor.parameter.units || 'unknown',
        value: measurement ? measurement.value : null
      };
    });

    console.log("=== Paired snapshot ===", paired);

    this.closestElement.set(paired);
  }

  // Obtiene los elementos químicos filtrados para la leyenda según los parámetros seleccionados
  async fetchElements(selectedParams: string[]) {
    if (!selectedParams || selectedParams.length === 0) return [];

    // Codifica cada nombre para que los caracteres especiales no rompan la URL
    const encodedNames = selectedParams.map(name => encodeURIComponent(name)).join(',');
    console.log(encodedNames)

    try {
      const res = await fetch(`http://localhost:3000/chemical-elements/filter?names=${encodedNames}`);
      if (!res.ok) {
        console.error('Error fetching elements:', res.statusText);
        return [];
      }

      const data = await res.json();
      console.log('Chemical elements fetched:', data);
      this.leyendaElements.set(data);
      return;
    } catch (err) {
      console.error('Fetch error:', err);
      return [];
    }
  }

}
