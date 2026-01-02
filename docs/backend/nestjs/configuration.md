import { PackageManagerTabs } from '@theme'

# Configuration

## Installation

<PackageManagerTabs command="install @nestjs/config" />


## Define configuration files

For more complex projects, you might want to use a factory function that returns a configuration object.

**Benefits**:
- **Dynamic configuration** → compute values at runtime (e.g., environment variables, conditional options).  
- **Testability** → easily mock or override configuration in unit/integration tests.  
- **Centralized logic** → combine configuration of the whole application in one place.  
- **Flexibility** → adapt configuration per environment (development, staging, production).  
- **Dependency injection support** → inject services like `ConfigService` to build the config.  
- **Async support** → fetch secrets or configs from external sources (e.g., Vault, AWS Secrets Manager).  

```ts title="config.ts"
export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'myapp',
  },
});
```


## Register ConfigModule

```ts title="app.module.ts"
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule {}
```

The above code will key/value pairs from the `.env` file from the default location (the project root directory) and merge them with environment variables assigned to `process.env`.

If you want to load `.env` file before the application starts, you can use the `--env-file` option of the Nest CLI:

```sh
nest start --env-file .env
```


## Accessing config values

Import `ConfigModule` in the module where you want to use it:

```ts title="feature.module.ts"
@Module({
  imports: [ConfigModule],
  // ...
})
```

Using it in the code:

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  getDbConfig() {
    // Get the "database" config object, type is automatically inferred
    return this.configService.get('database', { infer: true });
  }
}
```

With the `infer` property set to `true`, the `ConfigService#get` method will automatically infer the property type based on the interface.


## Use module globally

By declaring `ConfigModule` as a global module, you don't need to import it in other modules to access the `ConfigService`.

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
```


## Custom env file path

You can also specify multiple paths for `.env` files like this:

```ts
ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
});
```


## Validate config's schema

It is standard practice to throw an exception during application startup if required environment variables haven't been provided or if they don't meet certain validation rules.

```shell
yarn add @hapi/joi
yarn add --dev @types/hapi__joi
```

```ts
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
})
export class AppModule {}
```


## Using in the `main.ts`

```ts
import { ConfigService } from '@nestjs/config';

const configService = app.get(ConfigService<IConfiguration, true>);
const port = configService.get('port', { infer: true });
```