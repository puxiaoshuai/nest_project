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