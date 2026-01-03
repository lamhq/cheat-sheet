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


## Configuration namespaces

For complex projects, instead of using a [single configuration file](#define-configuration-files), you can define multiple configuration files and load them under their respective namespaces, using the `registerAs` function.

Create a namespaced configuration file using the `registerAs` function to organize related settings:

```typescript title="config/database.config.ts"
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432
}));
```

Load the namespaced configuration in the root module via the `load` property:

```typescript title="app.module.ts"
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
})
export class AppModule {}
```

Retrieve a value from the database namespace using dot notation with `ConfigService.get`:

```typescript
const dbHost = this.configService.get<string>('database.host');
```

Inject the database namespace directly for strong typing using `Inject` and `ConfigType`:

```typescript
constructor(
  @Inject(databaseConfig.KEY)
  private dbConfig: ConfigType<typeof databaseConfig>,
) {}
```


## Other topics

- [Custom env file path](https://docs.nestjs.com/techniques/configuration#custom-env-file-path)  
  Specify alternative paths for the `.env` file using the `envFilePath` property.

- [Disable env variables loading](https://docs.nestjs.com/techniques/configuration#disable-env-variables-loading)  
  Prevent loading of the `.env` file by setting `ignoreEnvFile` to `true`.

- [Namespaced configurations in modules](https://docs.nestjs.com/techniques/configuration#namespaced-configurations-in-modules)  
  Integrate namespaced configurations into other modules using `asProvider`.

- [Cache environment variables](https://docs.nestjs.com/techniques/configuration#cache-environment-variables)  
  Enable caching to improve performance of `ConfigService.get` for `process.env` variables.

- [Partial registration](https://docs.nestjs.com/techniques/configuration#partial-registration)  
  Load feature-specific configurations in individual modules using `forFeature`.

- [Schema validation](https://docs.nestjs.com/techniques/configuration#schema-validation)  
  Validate environment variables using Joi schemas during startup.

- [Custom validate function](https://docs.nestjs.com/techniques/configuration#custom-validate-function)  
  Implement a custom validate function with `class-validator` for configuration validation.

- [Custom getter functions](https://docs.nestjs.com/techniques/configuration#custom-getter-functions)  
  Add getter functions to `ConfigService` for a more natural coding style.

- [Environment variables loaded hook](https://docs.nestjs.com/techniques/configuration#environment-variables-loaded-hook)  
  Ensure variables are loaded from `.env` file before accessing `process.env`.

- [Conditional module configuration](https://docs.nestjs.com/techniques/configuration#conditional-module-configuration)  
  Conditionally load modules based on environment variables.

- [Expandable variables](https://docs.nestjs.com/techniques/configuration#expandable-variables)  
  Enable environment variable expansion to reference variables within others.

- [Using in the main.ts](https://docs.nestjs.com/techniques/configuration#using-in-the-maints)  
  Access `ConfigService` in `main.ts` to retrieve configuration values like port or CORS host.