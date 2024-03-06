import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './entities/todo-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  //传递提交的参数
  async create(createTodoListDto: CreateTodoListDto): Promise<Todo> {
    console.log('xxx',createTodoListDto);
    
    const { title, description } = createTodoListDto;
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    return this.todoRepository.update(id, {
      ...updateTodoListDto,
      status: updateTodoListDto.status || TodoStatus.TODO,
    });
  }

  async remove(id: number) {
    return this.todoRepository.delete({ id });
  }
}
