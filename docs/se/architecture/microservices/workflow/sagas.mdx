# Sagas

## Overview

The SAGA pattern is used for managing long-lived transactions that span multiple microservices.

Unlike two-phase commit, sagas coordinates multiple state changes without the need for locking resources.


## How it work?

The SAGA pattern divides a transaction into smaller steps (saga steps), each managed independently within a microservice.

A saga step can either commit or rollback independently.

Successful steps trigger the next, while failures roll back previous changes, ensuring eventual consistency in distributed systems.


## No atomicity

Saga does not provide atomicity like traditional database transactions.

Since a long-lived transaction (LLT) is split into smaller steps, the saga itself isn't atomic. However, each step can still follow ACID rules if needed.

Sagas give visibility into the transaction state, but handling failures and consistency is up to the system.

### Failure Recovery

Since sagas consist of multiple transactions, handling failures is crucial (recover when a failure happens).

Recovery can happen in two ways:  

- **Backward recovery**: Rolls back failed transactions using compensating actions to undo previous changes.  
- **Forward recovery**: Allows the system to to continue processing from the point of failure. We need to be able to retry transactions by persisting enough information.

Depending on the business process, one or both strategies may be triggered.


### Business failures

Saga allows us to recover from business failures, not technical failures. 

> For example, if we try and take payment from the customer but the customer has insufficient funds, then this is a business failure that the saga should be expected to handle. 
> 
> On the other hand, if the Payment Gateway times out or throws a 500 Internal Service Error, then this is a technical failure that we need to handle separately.


## Saga rollbacks
To roll back in a saga, a **compensating transaction** is needed to undo previous changes.

A compensating transaction is a new transaction that reverts the changes made by the original transaction, but we can't make it as the original transaction didn’t occur.

Since full rollback isn’t always possible, compensating transactions are called semantic rollbacks.

It's important to persist rollback information in the system.

*For example, if an order confirmation email was sent, a rollback can’t undo it. Instead, a **compensating transaction** sends a second email informing the customer of the cancellation. We also keep a record of aborted orders in the system.*


## Minimizing rollbacks

You can simplify rollback operations by pulling forward steps that are most likely to fail, reducing the need for triggering complex compensating transactions.

For example, imagine an online store where a customer places an order, triggering multiple steps:  
1. **Charge payment**  
2. **Check inventory**  
3. **Reserve shipping slot**  

If payment fails, rolling back inventory and shipping reservations would be needed. Instead, by **checking inventory first**, you avoid unnecessary rollback if an item is out of stock, reducing compensating transactions.  


## Fail-forward situations

Some failures may require a rollback (fail backward), others may be fail forward.

*For example, when processing an order, if for whatever reason we can’t dispatch the package, it seems very odd to roll the whole order back. Instead, we’d probably just retry the dispatch, and if that fails, we’d require human intervention to resolve the situation.*


## Implementing Sagas

Two styles of saga implementation: **Orchestrated sagas** and **Choreographed sagas**.

### Orchestrated sagas

Orchestrated sagas use a central coordinator (orchestrator) to:
- define the order of execution
- call the appropriate services
- handle failures and compensating action.

Orchestrated sagas make heavy use of request-response interactions.

**Advantages:**  
- The business process is clearly modeled in one place, making it easy to understand.  

**Downsides:**  
- The orchestrator tightly couples with all services, increasing dependencies.  
- Services may lose autonomy as logic shifts to the orchestrator instead of staying within each service (they become passive, acting only on commands from the orchestrator instead of managing their own logic and data).
- If the orchestrator fails or bottlenecks, the entire process can stall, affecting all dependent services (Single Point of Failure).

For example, we have `Order Processor` that manage the whole Order Processing workflow:

![](./sagas/orchestrated-sagas.drawio.svg)


### Choreographed sagas

A choreographed saga distributes responsibility across multiple services, using events for collaboration.

Events are broadcast, allowing microservices to react to them. It’s possible that multiple microservices may react to the same event.

![](./sagas/choreographed-sagas.drawio.svg)

> In the example, when the `Warehouse` service receives that first `Order Placed` event, it knows its job is to reserve the appropriate stock and fire an event once that is done.
>
> If the stock couldn’t be received, the `Warehouse` would need to raise an appropriate event, which might lead to the order being aborted.
> 
> When the `Payment Taken` event is fired by the `Payment Gateway`, it causes reactions in both the `Loyalty` and `Warehouse` microservices. The `Warehouse` reacts by dispatching the package, while the `Loyalty` microservice reacts by awarding points.

**Advantages**:  
- Services are independent, only reacting to received events, reducing domain coupling.  
- Distributed implementation helps avoiding concerns about centralization of logic.

**Downsides**:  
- Understanding the overall business process requires piecing together individual service behaviors.  
- No built-in saga state tracking, triggering compensating actions become difficult.  

**Solution**:  
- Use a **correlation ID** in all saga-related events.  
- When a service reacts to an event, it extracts and passing the ID to subsequent events.  
- A **dedicated service** monitors events, providing a view of the state, handling fulfillment issues.  


### Choreographed or orchestration?

**Choreographed sagas** introduce event-driven collaboration, requiring a mindset shift but enabling a loosely coupled architecture, which often outweigh the challenges.  

**Orchestration** suits when a single team owns the entire saga, while **choreography** is ideal for scenarios involving multiple teams.

Orchestration relies on request-response calls, whereas choreography makes more extensive use of events.


## Sagas vs. Distributed Transactions

Distributed transactions come with some significant challenges and should be avoided.

Modeling business processes as sagas avoids distributed transaction challenges and enhances clarity for developers by modeling business processes explicitly and reducing tight coupling between services.