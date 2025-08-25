import { Controller, Get } from '@nestjs/common';
import { AirQualityService } from '../services/air-quality.service';
import { Param, Query } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) { }

  @Get('locations')
  async getLocations() {
    return this.airQualityService.getLocations();
  }
  @Get('locations/fetch')
  async fetchFromApi(@Query('id') id: number) {
    return this.airQualityService.fetchByIdFromExternalApi(id);
  }
  @Get('bbox')
  async fetchFromPosition(@Query('bbox') bbox:[]){
    return this.airQualityService.fetchByBbox(bbox)
  }
  @Get('sensors/:locationId')
  async getSensors(@Param('locationId') locationId: number) {
    return this.airQualityService.getSensors(locationId);
  }
  @Get('chart-data/:id/:element/:date_from/:date_to')
  async getChartData(@Param('id') id: number, @Param('element') element: string, @Param('date_from') date_from: string, @Param('date_to') date_to: string ) {
    console.log(id, element, date_from, date_to);
    return this.airQualityService.getChartData(id, element, date_from, date_to);
  }
}
