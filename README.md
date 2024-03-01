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