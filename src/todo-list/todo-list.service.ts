import { HttpException, Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './entities/todo-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchTodoListDto } from './dto/search.dto';

/**
 * 访问数据库的服务，提供增删改查的内容
 */
@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  //传递提交的参数
  async create(createTodoListDto: CreateTodoListDto): Promise<Todo> {
    const { title, description } = createTodoListDto;
    //如此每个都去判断不太现实，可在dao中进行验证 ,使用 classValidator进行相关校验
    const currentTodo = await this.todoRepository.findOne({ where: { title } });
    if (currentTodo) {
      throw new HttpException('已存在相同标题的代办项', 401);
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.ctime = currentTime;
    todo.utime = currentTime;
    return this.todoRepository.save(todo);
  }

  async findAll(query): Promise<any> {
    //进行分页处理
    const todoQuery = this.todoRepository.createQueryBuilder('post');
    const count = await todoQuery.getCount();
    const { pageNum = 1, pageSize = 2, ...params } = query;
    todoQuery.limit(pageSize);
    todoQuery.offset(pageSize * (pageNum - 1));
    const posts = await todoQuery.getMany();
    return { list: posts, total: count };
  }

  async findOne(search: SearchTodoListDto): Promise<Todo> {
    const { id } = search;
    const existToDo = await this.todoRepository.findOneBy({ id });
    if (!existToDo) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return existToDo;
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    const existToDo = await this.todoRepository.findOneBy({ id });
    if (!existToDo) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return this.todoRepository.update(id, {
      ...updateTodoListDto,
      utime: currentTime,
      status: updateTodoListDto.status || TodoStatus.TODO,
    });
  }

  async remove(id: number) {
    const existToDo = await this.todoRepository.findOneBy({ id });
    if (!existToDo) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return this.todoRepository.delete({ id });
  }
}
