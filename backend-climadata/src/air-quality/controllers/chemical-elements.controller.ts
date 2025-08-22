import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ChemicalElementsService } from "../services/chemical-elements.service";

@Controller('chemical-elements')
export class ChemicalElementsController {
  constructor(private readonly chemicalElementsService: ChemicalElementsService) { }

  @Post('populate')
  async populateDB() {
    return this.chemicalElementsService.populateDB();
  }

  @Get()
  async findAll() {
    return this.chemicalElementsService.findAll();
  }

  @Get('filter')
  async findFiltered(@Query('names') names: string) {
    if (!names) return [];

    // Decodifica los nombres correctamente
    const decodedNames = names.split(',').map(name => decodeURIComponent(name).trim());

    // Llama al servicio para buscar los elementos
    const elements = await this.chemicalElementsService.findByNames(decodedNames);
    return elements;
  }
}