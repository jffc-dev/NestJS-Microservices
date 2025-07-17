import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetOneProductDto } from './dto/output/get-one-product';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      { ...paginationDto },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.productsClient
    //   .send<GetOneProductDto>({ cmd: 'find_one_product' }, { id: Number(id) })
    //   .pipe(
    //     catchError((error) => {
    //       throw new RpcException(error);
    //     }),
    //   );
    try {
      const product: GetOneProductDto = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product: GetOneProductDto = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'update_product' },
          { id: +id, ...updateProductDto },
        ),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const product: GetOneProductDto = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, { id: +id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
