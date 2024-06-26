### IOC (Inversion of Control)
我们把IOC想像成一个容器，程序初始化的时候会扫描 class 上声明的依赖关系，然后把这些 class 都给 new 一个实例放到容器里。创建对象的时候，还会把它们依赖的对象注入进去。这样不就完成了自动的对象创建和组装么？这种依赖注入的方式叫做 Dependency Injection，简称 DI。本来是手动 new 依赖对象，然后组装起来，现在是声明依赖了啥，等待被注入

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
@controller是一个类装饰器，用于定义一个控制器,可被注入,处理传入的请求和返回响应
@Injectable是一个类装饰器，用于定义一个 服务提供者，代表这个class可注入到其他 控制器或其他服务中

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


### jwt + 本地 守卫流程
1.用户注册时，对password进行 bcryptjs 加密
2.用户登录时，对password进行 bcryptjs 解密，然后和数据库中的password进行对比。成功返回user
2.1在返回user的同时，使用 password.js  local策略 对 user(id,username,role)的信息提取，产生token
3.使用 password.js 的jwt策略，对接口添加   @UseGuards(AuthGuard('jwt')) 守卫，内部会根据 token进行验证，如果验证成功，则返回user，并执行请求

Authorization  Bearer xxxxxxx
### 数据库设计范式
需求分析- 逻辑设计-数据库创建-维护和优化

用户系统
权限系统

### typeorm联合查询 区别
innerJoin
leftJoin
leftJoinAndSelect
leftJoinAndMapMany
leftJoinAndMapOne

###  权限管理
ACL权限控制
ACL 中每个用户  ，user1 =[权限1，权限2，权限3] use2 =[权限3]  也就是 用户直接绑定权限
RBAC的区别 
user1 -> 角色1-> [权限1，权限2，权限3]   user2-> 角色2-> [权限3] 角色是权限的集合

举例比较：如果管理员权限有访问A、B、C的权限，在某一天，需要给管理员增加D的权限。在ACL中，存在管理员用户1，2，3，则需要分别给用户1，2，3添加访问D的权限。而在RBAC中，只需要给管理员这一角色添加D的权限。