import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  Query,
  Redirect,
  HttpStatus,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchTodoListDto } from './dto/search.dto';
/**
 *  请参数的定义： param, url进行传参获取
 *   body body携带 x-www-form-urlencoded 格式的参数
 */
@ApiTags('代办')
@Controller('todo')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}
  @ApiOperation({ summary: '创建代办事项' })
  @Post()
  async create(@Body() createTodoListDto: CreateTodoListDto) {
    //失败的话，如何自定义异常？ httperror.interceptor.ts统一捕获\
    const create = await this.todoListService.create(createTodoListDto);
    return {
      data: create,
    };
  }
  @ApiOperation({ summary: '获取所有的代办事项' })
  @Get()
  async findAll(@Body() params) {
    const list = await this.todoListService.findAll(params);
    return {
      data: list,
    };
  }
  @Get('/list')
  @Redirect('https://www.baidu.com')
  async list() {
    return {};
  }

  //通过访问 api/todo/xx, 使用 @Param接收 , ParseIntPipe校验数字
  // @ApiOperation({ summary: '通过id获取代办事项' })
  // @Get(':id')
  // async findOne(@Param('id',new ParseIntPipe({exceptionFactory:()=>{
  //   throw new HttpException('请输入数字', HttpStatus.BAD_REQUEST);
  // }})) id: number) {
  //   const todo = await this.todoListService.findOne(id);
  //   return {
  //     data: todo
  //   };
  // }
  @ApiOperation({ summary: '通过id获取代办事项' })
  @Get(':id')
  async findOne(@Param('id') id: SearchTodoListDto) {
    const todo = await this.todoListService.findOne(id);
    return {
      data: todo,
    };
  }

  //通过访问 api/todo/getone, 并且在params中传值，使用query接收
  // @ApiOperation({ summary: '通过id获取代办事项' })
  // @Get("getone")
  // async findOne(@Query('id') id: string) {
  //   console.log('id',id);
  //   const todo = await this.todoListService.findOne(+id);
  //   return {
  //     data: todo
  //   };
  // }

  //Put  幂等， 实体是直接替换
  //patch，实体部分进行更新
  @ApiOperation({ summary: '更新代办事项' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    await this.todoListService.update(+id, updateTodoListDto);
    return {
      message: '更新成功',
    };
  }
  @ApiOperation({ summary: '删除代办事项' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.todoListService.remove(+id);
    return {
      message: '删除成功',
    };
  }
}
