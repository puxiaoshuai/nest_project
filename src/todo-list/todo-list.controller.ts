import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

@Controller('todo')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  async create(@Body() createTodoListDto: CreateTodoListDto) {
    //失败的话，如何自定义异常？
    return await this.todoListService.create(createTodoListDto);
  }

  @Get()
  async findAll() {
    const list = await this.todoListService.findAll();
    return {
      data: list,
      message: '成功',
      code: 200,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoListService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return await this.todoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todoListService.remove(+id);
  }
}
