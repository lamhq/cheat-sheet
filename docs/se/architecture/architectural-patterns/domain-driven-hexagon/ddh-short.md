# Domain-Driven Hexagon Cheat Sheet

## Introduction

Domain-Driven Hexagon combines **Domain-Driven Design (DDD)** with **Hexagonal Architecture** (Ports and Adapters), Clean Architecture, and related principles.

Goal: technology-agnostic, modular, testable, scalable software with business logic at the center.

**Advantages**:

- Framework-agnostic: swap frameworks/databases/services with minimal changes.
- Secure: security principles integrated into design.
- Clear separation of concerns: teams can work independently.
- Testable and scalable: adding features remains manageable.

**Disadvantages**:

- Requires strong expertise in DDD, Clean/Hexagonal architecture, and SOLID.
- Adds up-front complexity: extra layers, abstractions, boilerplate.

**When to use**: applications with complex business logic. Not recommended for simple CRUD apps (use MVC instead).

## Architecture Overview

Codebase organized into small, independent **modules** reflecting domain concepts. Each module has 3 layers:

| Layer                           | Responsibility                                                                                                              | Depends on |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Interface Adapters**          | Entry points (controllers, DTOs) for users/external systems; translate requests into commands/queries and return responses  | Core       |
| **Core** (Application + Domain) | Business logic: entities, aggregates, value objects, domain services, events. Framework-independent                         | nothing    |
| **Infrastructure**              | Technical details: repositories, persistence models, messaging, external API integrations. Implements ports defined in Core | Core       |

![](https://github.com/Sairyss/domain-driven-hexagon/blob/master/assets/images/DomainDrivenHexagon.png?raw=true)

## Data Flow

1. **Request/CLI command/event** arrives as a plain **DTO** to a Controller.
2. **Controller** maps DTO to a **Command/Query object**, calls an Application Service.
3. **Application Service** orchestrates business logic via **entities/aggregates/domain services**, calls Infrastructure via **ports**.
4. **Infrastructure**: maps data to needed format, persists/retrieves data, calls external APIs or sends events via adapters, maps results back to domain.
5. Application Service returns result to Controller.
6. Controller returns data to user/presenter/view.

## Project Structure

Here's an example of a `user` module:

```
src/
└── user/
    ├── index.ts
    ├── interface/
    │   ├── dtos/
    │   │   ├── create-user.request.dto.ts
    │   │   ├── find-users.request.dto.ts
    │   │   ├── find-users.response.dto.ts
    │   │   ├── users.paginated.response.dto.ts
    │   │   └── user.response.dto.ts
    │   ├── controllers/
    │   │   ├── create-user.http.controller.ts
    │   │   └── find-users.http.controller.ts
    │   └── event-handlers/
    │       ├── user-created.integration-event-handler.ts
    │       ├── user-deleted.integration-event-handler.ts
    │       └── user-role-changed.integration-event-handler.ts
    ├── core/
    │   ├── commands/
    │   │   └── create-user.command.ts
    │   ├── queries/
    │   │   └── find-users.query.ts
    │   ├── services/
    │   │   ├── find-users.service.ts
    │   │   └── create-user.service.ts
    │   ├── ports/
    │   │   └── user.repository.port.ts
    │   ├── entities/
    │   │   └── user.entity.ts
    │   ├── aggregates/
    │   ├── value-objects/
    │   │   └── address.value-object.ts
    │   ├── domain-services/
    │   ├── events/
    │   │   ├── user-address-updated.domain-event.ts
    │   │   ├── user-created.domain-event.ts
    │   │   ├── user-deleted.domain-event.ts
    │   │   └── user-role-changed.domain-event.ts
    │   ├── errors/
    │   │   └── user.errors.ts
    │   └── types/
    │       └── user.types.ts
    └── infrastructure/
        ├── repositories/
        │   └── user.repository.ts
        ├── models/
        │   └── user.model.ts
        ├── mappers/
        │   └── user.mapper.ts
        └── user.module.ts
```

**Best practices**:

- Divide by module (`user`, `payment`, etc.), then by sub domain (optional), finally by layer (`interface`, `core`, `infrastructure`).

## Modules

Each module lives in its own folder and represents a bounded context/business capability.

Each module has an **index file** exporting its public API (commands, queries, events, ports, types, constants), it's the only file importable from outside.

:::tip
Consider using [eslint-plugin-boundaries](https://www.npmjs.com/package/eslint-plugin-boundaries) to enforce boundaries.
:::

**Best practices**:

- Avoid creating a separate module for each entity — instead, group entities that are strongly related into one module.
- No importing module's internals; only import its API definitions from module's index file.
- Modules communicate with each other via sending commands/queries/events, do not call each other's services directly.
- Move shared logic to common utilities, not cross-module dependencies.

## Interface Adapters Layer

The layer is the entry point of the application.

Responsibilities:
- Transforms requests/events from clients/external systems into **Commands/Queries/Events** and dispatches them to the core layer.
- Map results from the core layer back to a format suitable for clients/external systems.

It provides user-facing interfaces like:
- Input/Output data transfer objects (DTOs)
- CLI/HTTP/WebSocket Controllers
- Event Handlers (for queue, message broker, etc.)

### Controllers

User-facing APIs that parse requests, trigger business logic, present results (REST, GraphQL, message handlers, etc.).

**Best practices**:

- One controller per use case.
- Differentiate controllers by trigger type (e.g., `create-user.http.controller.ts`, `create-user.cli.controller.ts`, etc.).

### Data Transfer Objects (DTOs)

Carry data between processes; define contracts between the application and clients.

- **Request DTOs**: define data structure for client's requests (can be used for validation).
- **Response DTOs**: the expected data structure clients want to receive.

**Best practices**:

- DTO properties should be mostly primitives, flat structures.
- Prefer whitelisting over blacklisting properties in responses.
- Place DTOs in a shared package if used across apps (frontend/backend).
- Use `class-validator` / `class-sanitizer` decorators for validation/sanitization.
- Transform data to DTOs in DTO constructors.

:::tips
When domain objects shouldn't be exposed outside domain layer, **Local DTO**s are used as contracts between domain layer and other layers. It decouples modules, protects clients from internal data changes, but adds extra code.
:::

## Core Layer

Center of the architecture, independent of frameworks/databases/external systems — keeps business logic pure and technology-agnostic. Divided into **Application** and **Domain**.

### Application

Defines **use cases** — how business rules are applied to achieve goals. Interface layer converts input into Command/Query objects, delegated to Application Services which execute the use case using the Domain layer.

#### Commands

Data object with info needed to perform an action (e.g., create user). Executed via **Command Bus**, not by calling Application Services directly.

```ts title="create-user.command.ts"
export class CreateUserCommand extends Command {
  readonly email: string;
  readonly country: string;
  readonly postalCode: string;
  readonly street: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }
}
```

Handler:

```ts title="create-user.service.ts"
@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, UserAlreadyExistsError>> {
    const user = UserEntity.create({
      email: command.email,
      address: new Address({
        country: command.country,
        postalCode: command.postalCode,
        street: command.street,
      }),
    });

    try {
      // wrap in transaction so domain events are processed atomically
      await this.userRepo.transaction(async () => this.userRepo.insert(user));
      return Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
```

#### Queries

Data object expressing intent to retrieve data (must not change state). Executed via **Query Bus**. Read models can bypass domain/repository layers and query directly (e.g., raw SQL via Slonik).

```ts title="find-users.query.ts"
export class FindUsersQuery extends PaginatedQueryBase {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
}
```

:::note
Command and Query objects should only contain primitive types, not Domain layer types.
:::

#### Application Services

Orchestrate steps to fulfill client use cases. Connect Interface layer (controllers/DTOs) with Domain layer (entities/value objects). Don't contain business rules — delegate to entities/aggregates/domain services. Call **Ports** but don't depend on Infrastructure directly (adapters injected via DI). Often wrap actions in a unit of work (e.g., DB transaction).

**Best practices**:

- Must not depend on other Application Services (avoid cyclic dependencies).
- One Application Service per use case.
- Avoid business logic here — use Domain Services instead (prevents Anemic Domain Model).

#### Ports

Interfaces defining contracts that Infrastructure Adapters must implement. Designed to match Domain needs, not just mirror tool APIs. Implementations live in Infrastructure, injected via DI — keeps business logic technology-independent and testable.

**Benefits**: testability (mock implementations), flexibility (swap implementations), isolation (design domain before choosing tech).

**Best practices**:

- Split large ports when sensible, avoid excessive fragmentation (Interface Segregation Principle).
- Only add ports for things likely to change; avoid unnecessary abstractions.

```ts title="user.repository.port.ts"
export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>;
}
```

### Domain

Contains the application's business rules, operating on domain objects described by **ubiquitous language**.

**Best practice**: minimize dependencies in this layer.

#### Entities

Represent business rules and attributes: properties, actions, and conditions for those actions. Equality based on identifier (`id`). Always validate on creation, enforce invariants (e.g., positive quantity). Avoid empty constructors — validate in constructor/factory methods. Make partially immutable (`id`, `createdAt` readonly).

#### Aggregates

A cluster of related entities/value objects treated as a single consistency unit. The **Aggregate Root** is the entry point — all external interactions go through it, controlling access to internal entities and protecting invariants.

**Best practices**:

- Design should not be influenced by the data model (associations ≠ DB relationships).
- Only reference the Aggregate Root from outside the aggregate.
- Use IDs, not direct object references, between aggregates.
- All changes to an aggregate saved/updated/deleted together.
- Protect invariants across the whole aggregate lifecycle.

#### Value Objects

Domain concepts defined by **attributes**, not identity. Equal if all properties match.

**Key characteristics**:

- No identity — indistinguishable if values match.
- Immutable — new instance created if values differ.
- Behavior-focused — can contain validation/formatting logic.
- Lightweight — models money, dates, addresses, emails, etc.

#### Domain Services

Execute logic involving two or more **Entities**, when that logic doesn't fit naturally in an Entity or Value Object without breaking encapsulation. Operate only on Domain types, using ubiquitous language.

#### Domain Invariants

Rules that must always hold true in a context (e.g., wallet balance ≥ 0). Enforced by entities, aggregates, value objects. Avoid public setters — use methods that validate changes.

- **Enforcing via Value Objects**: wrap primitives (e.g., `Email`) to validate at creation, encapsulate logic, reduce bugs. Serialize VOs to primitives before sending to other processes (DTOs, events).
- **Compile-time validation**: use types (e.g., `type ContactInfo = Email | Phone | [Email, Phone]`) to catch errors during development (typestate pattern).
- **Runtime validation**:
  - **Validation**: filters bad input at application boundaries (DTOs), returns errors.
  - **Guarding**: enforces invariants inside the domain, throws exceptions on violation (Fail Fast principle) — indicates a bug if triggered.

#### Domain Events

Signal something significant happened within the domain, notifying other parts of the **same process** (in-memory dispatcher). E.g., a purchase triggers updating cart, deducting wallet, creating shipping order. Useful for audit logs (save events to DB); changes can be committed in a single transaction.

#### Integration Events

Events sent to **external** processes (microservices, APIs). Only published after all Domain Events are processed and changes saved. Use tools like RabbitMQ/Kafka with patterns: Transactional Outbox, Change Data Capture, Sagas, Process Manager.

#### Domain Errors

Core/Domain layers must not throw HTTP exceptions (context-agnostic — may run in HTTP, CLI, etc.). Use custom error classes with error codes instead.

- Throw exceptions for unrecoverable errors (out of memory, connection failure).
- Return explicit error types (ADT / Result object with Ok/Err) for recoverable errors.

**Benefits**: documents error types explicitly, enables different handling strategies (retry/transform/propagate), improves robustness and security.

```ts title="user.errors.ts"
export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message = 'User already exists';
}
```

### Using Libraries in Core

Only single-responsibility libraries that help implement domain logic (e.g., number utilities).

Avoid libraries that:

- Access out-of-process resources (HTTP, DB).
- Add irrelevant functionality (frameworks, ORMs, loggers).
- Introduce randomness (random IDs/timestamps) — complicates testing.
- Have excessive dependencies.

## Infrastructure Layer

Provides technical capabilities supporting application and domain: data persistence, networking, logging, caching, auth, external system integration. Contains concrete **Adapters** implementing **Ports** from Core.

Example: Core defines `OrderRepositoryPort` → Infrastructure provides `PostgresOrderRepository`/`MongoOrderRepository` → DI injects the chosen implementation at runtime.

Can contain: framework code, I/O services, DB repositories, ORM entities/schemas, message/event publishers, email services, file storage services, etc.

### Adapters

Enable interaction with external systems (databases, message brokers, 3rd party APIs) or between domains within a process (avoiding coupling). Implement ports and are only accessed through them — callers depend on ports, not adapter implementations.

**Key components**: a port implemented, a mapper (domain ↔ external data), a DTO/interface for received data, a validator to ensure data integrity.

### Repositories

Special adapter encapsulating data-access logic; decouples DB technology from the domain model.

**Data flow**: receive domain Entity from Application Service → map to DB schema/ORM format → perform operation (save/update/retrieve) → map back to domain Entity → return.

```ts title="repository.port.ts"
export interface RepositoryPort<Entity> {
  insert(entity: Entity | Entity[]): Promise<void>;
  findOneById(id: string): Promise<Option<Entity>>;
  findAll(): Promise<Entity[]>;
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>;
  delete(entity: Entity): Promise<boolean>;
  transaction<T>(handler: () => Promise<T>): Promise<T>;
}
```

Concrete implementation extends a base repository and implements the port, using a mapper to convert to/from domain entities.

### Persistence Models

Database-oriented representations of data used by repositories — separate from domain models (domain focuses on logic, persistence models suit DB needs).

**Benefits**: avoids mixing domain logic with DB concerns; allows independent normalization/denormalization.

**Challenges**: requires effort to maintain mappers/abstractions; may be overkill for small apps.

A **Mapper** converts between domain entities and persistence models (`toPersistence` / `toDomain`).

:::tip
For small projects, a TypeORM entity can double as the persistence model.
:::

## References

- [Sairyss / domain-driven-hexagon (GitHub)](https://github.com/Sairyss/domain-driven-hexagon)
