### 目录结构 
src/
├── [module-name]/
│   ├── dto/                     # 数据传输对象（Data Transfer Objects）
│   │   └── [dto-name].dto.ts
│   ├── entities/                # 数据库实体
│   │   └── [entity-name].entity.ts
│   ├── [module-name].module.ts  # 模块定义文件
│   ├── [module-name].service.ts # 服务文件，包含业务逻辑
│   └── [module-name].controller.ts # 控制器文件，处理请求和响应
├── main.ts

src/
├── common/
│   ├── filters/                 # 异常过滤器
│   ├── guards/                  # 守卫
│   ├── pipes/                   # 管道
│   └── decorators/              # 自定义装饰器


src/
├── config/
│   ├── configuration.ts         # 配置定义
│   └── ...

### 常用命令
nest new 名称 创建项目
nest -h/--help 帮助
nest g co 名称 创建控制器
nest g s 名称 创建服务
nest g mi 名称 创建中间件
nest g pi 名称 创建管道
nest g mo 名称 创建模块
nest g gu 名称 创建守卫

nest g resource xxx 生成整套的curd

### 实现一个代办事项的curd
nest g resource todo
安装插件
npm install @nestjs/typeorm typeorm mysql
npm install class-validator class-transformer

####错误
nest使用typeorm连接mysql, 创建新数据时，提示 Field 'status' doesn't have a default value
```
@Column({ default: TodoStatus.TODO })
  status: number;
```
#### provider的几种注入方式
参考： https://juejin.cn/post/7340127788053626917?searchId=2024030815363204D53434F9CC081FABEB#heading-2

1.默认的class注入
```
@Injectable()
export class TodoListService {}
在modules中使用
...
 providers: [TodoListService],
```
2.使用 useClass的方式，[当你想要注入一个类，但是使用不同于通常实例化的类时，可以使用 useClass。]
```
providers:[
  {
    provider: TodoListService,
    useClass: process.env.NODE_ENV === 'development' ? TodoListMockService : TodoListService,
  }
]
```

#### 装饰器的使用
@module这是一个类装饰器，用于定义一个模块。
@controller是一个类装饰器，用于定义一个控制器,处理传入的请求和返回响应
@Injectable是一个类装饰器，用于定义一个 服务提供者，可以被注入到控制器或其他服务中

### 遇到的问题 
####  1.配置校验时：
status must be a number conforming to the specified constraints
配置：
```
app.useGlobalPipes(new ValidationPipe({
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }));
```
### Body,Param,Query
Body 获取 post 传递相关内容
param获取  url上 /id/1的内容
Query 获取 get 从params传递的内容


### pipe管道的作用
https://nest.nodejs.cn/pipes
1.将输入数据转换为所需的形式（例如，从字符串到整数）
2.评估输入数据，如果有效，只需将其原样传递；否则抛出异常
### 守卫
守卫在所有中间件之后、任何拦截器或管道之前执行。
// 守卫，  1 token验证的守卫， 2.角色权限的守卫，

全局守卫之后，如何给部分进行 白名单配置呢？ 自定义装饰器，判断public内容
https://nest.nodejs.cn/security/authentication#%E5%85%A8%E5%B1%80%E5%90%AF%E7%94%A8%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81

角色守卫，如何来判断角色呢？
自定义元数据 或者 使用 自定义装饰器
https://nest.nodejs.cn/guards#%E4%B8%BA%E6%AF%8F%E4%B8%AA%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E8%AE%BE%E7%BD%AE%E8%A7%92%E8%89%B2


