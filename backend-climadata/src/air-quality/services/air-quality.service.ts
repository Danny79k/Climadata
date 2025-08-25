import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { Location } from '../schemas/location.schema';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AirQualityService {
  private readonly TTL = 5 * 60 * 1000; // 5 minutos
  private readonly API_URL = 'https://api.openaq.org/v3/locations?countries_id=67&bbox=';
  private readonly API_KEY = process.env.API_KEY;
  private readonly defaultBbox = "-18.2000,27.6000,-13.2000,29.6000"

  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
    private http: HttpService,
  ) { }

  async getLocations(): Promise<any[]> {
    const fiveMinutesAgo = new Date(Date.now() - this.TTL);

    // Buscar en la base de datos si hay datos actualizados recientemente
    const recent = await this.locationModel.find({
      updatedAt: { $gte: fiveMinutesAgo },
    });

    if (recent.length > 0) {
      console.log('✅ Devolviendo datos desde MongoDB');
      //console.log('recents' + recent)
      return recent;
    }

    try {
      const response = await firstValueFrom(this.http.get(this.API_URL + this.defaultBbox, {
        headers: { 'x-api-key': this.API_KEY },
      }));

      const results = response?.data?.results;

      if (!Array.isArray(results)) {
        console.warn('⚠ No se recibieron datos válidos de la API');
        return [];
      }

      // Normalizar fechas y guardar
      const processed = results.map((location) => {
        if (location.datetimeFirst?.utc) {
          location.datetimeFirst = new Date(location.datetimeFirst.utc);
        }
        if (location.datetimeLast?.utc) {
          location.datetimeLast = new Date(location.datetimeLast.utc);
        }

        return {
          ...location,
          updatedAt: new Date(),
        };
      });

      // Guardar persistencia
      for (const location of processed) {
        await this.locationModel.findOneAndUpdate(
          { id: location.id },
          location,
          { upsert: true, new: true }
        );
      }

      console.log('✅ Datos guardados en MongoDB desde la API');
      //console.log(processed)
      return processed;
    } catch (error) {
      console.error('❌ Error al llamar a la API:', error.message);
      return [];
    }
  }
  // Obtiene los datos de una ubicación específica desde la API externa por su ID
  // id: número identificador de la ubicación
  // Retorna los datos obtenidos de la API o un array vacío si hay error
  async fetchByIdFromExternalApi(id: number): Promise<any> {
    // Construye la URL para la petición usando el ID proporcionado
    const url = `https://api.openaq.org/v3/locations/${id}/latest`;
    const DTO: any[] = [];

    // Realiza la petición HTTP GET a la API externa con la API KEY
    const response = await firstValueFrom(this.http.get(url, {
      headers: { 'x-api-key': this.API_KEY },
    }));

    // Si no se recibe respuesta válida, muestra advertencia y retorna array vacío
    if (!response) {
      console.warn('No se recibieron datos válidos de la API');
      return [];
    }

    // Si la respuesta contiene un array de resultados, procesa cada elemento
    if (Array.isArray(response.data.results)) {
      await Promise.all(response.data.results.map(async (item: any) => {
        // Si el elemento tiene sensorsId, lo muestra por consola
        if (item.sensorsId) {
          //console.log(item.sensorsId);
          const sensors = await firstValueFrom(this.http.get(`https://api.openaq.org/v3/sensors/${item.sensorsId}`, {
            headers: { 'x-api-key': this.API_KEY },
          }))
          if (!sensors) {
            return [];
          }
          //console.log(sensors.data.results);

          if (!DTO[0]) {
            DTO[0] = { sensors: [] };
          }
          DTO[0].sensors.push(sensors.data.results[0]);
        }
      }));
    }
    DTO.push({ measurements: response.data.results });
    //console.log('DTO', DTO);
    //console.log('sensores', DTO[0].sensors)
    const measurements = response.data.results;
    for (const measurement of measurements) {
      const sensorId = measurement.sensorsId;
      const sensorData = DTO[0]?.sensors?.find((s: any) => s.id === sensorId);

      // Verifica que el sensorId del measurement coincida con el id del sensor
      if (sensorData && sensorId === sensorData.id) {
        const datetime = measurement.datetime?.utc ? new Date(measurement.datetime.utc) : null;

        // Comprueba si ya existe un registro con el mismo sensorId y datetime
        const exists = await this.locationModel.db.collection('history').findOne({
          sensorId: sensorId,
          datetime: datetime,
        });

        if (!exists) {
          // Guarda el DTO en el history.schema
          await this.locationModel.db.collection('history').insertOne({
            sensorId: sensorId,
            measurement: measurement,
            datetime: datetime,
            createdAt: new Date(),
          });
        }
      }
    }
    // Retorna los datos obtenidos de la API
    return DTO;
  }

  async fetchByBbox(bbox) {
    //console.log(bbox)
    try {
      const response = await firstValueFrom(this.http.get(this.API_URL + bbox, {
        headers: { 'x-api-key': this.API_KEY },
      }));

      const results = response?.data?.results;

      if (!Array.isArray(results)) {
        console.warn('⚠ No se recibieron datos válidos de la API');
        return [];
      }

      // Normalizar fechas y guardar
      const bboxResults = results.map((location) => {
        if (location.datetimeFirst?.utc) {
          location.datetimeFirst = new Date(location.datetimeFirst.utc);
        }
        if (location.datetimeLast?.utc) {
          location.datetimeLast = new Date(location.datetimeLast.utc);
        }

        return {
          ...location,
          updatedAt: new Date(),
        };
      });

      // Guardar persistencia
      for (const location of bboxResults) {
        await this.locationModel.findOneAndUpdate(
          { id: location.id },
          location,
          { upsert: true, new: true }
        );
      }

      console.log('✅ Datos guardados en MongoDB desde la API');
      //console.log(bboxResults)
      return bboxResults;
    } catch (error) {
      console.error('❌ Error al llamar a la API:', error.message);
      return [];
    }
  }

  async getSensors(locationId: number) {
    try {
      const sensors = await firstValueFrom(this.http.get(`https://api.openaq.org/v3/locations/${locationId}/sensors`, {
        headers: { 'x-api-key': this.API_KEY },
      }));
      return sensors.data.results;
    } catch (error) {
      console.error('❌ Error al llamar a la API:', error.message);
      return [];
    }
  }

  async getChartData(id: number, sensorId: string, date_from: string, date_to: string) {
    console.log('sensorId:', typeof sensorId, sensorId);


    const recordsResponse = await firstValueFrom(this.http.get(`https://api.openaq.org/v3/sensors/${sensorId}/days?date_from=${date_from}&date_to=${date_to}`, { headers: { 'x-api-key': this.API_KEY } }))

    if (!recordsResponse || !Array.isArray(recordsResponse.data?.results)) return [];

    // Arma los datos para el chart
    const chartData = recordsResponse.data.results.map(record => ({
      value: record.value,
      datetime: record.period?.datetimeFrom?.utc || record.period?.datetimeFrom?.local
    })).filter(item => item.value !== undefined);


    return chartData;
  }

}

