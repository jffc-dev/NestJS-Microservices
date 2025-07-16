import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  create() {
    return 'This method creates a new product';
  }

  @Get()
  findAll() {
    return 'This method returns all products with pagination';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'This method returns a product by ID';
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return 'This method updates a product by ID';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'This method removes a product by ID';
  }
}
