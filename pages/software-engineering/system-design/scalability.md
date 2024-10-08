# Scaling

## Overview

Scalability means that an application / system can handle a greater loads by adapting.

There are two kind of scaling:
- Vertical scaling
- Horizontal scaling


## Vertical scaling

Vertical scaling, referred to as "scale up", means adding more power (CPU, RAM, etc.) to your servers. 

The simplicity of vertical scaling is its main advantage. 

Use cases:
- Common for non distributed systems, such as database.
- When traffic is low, vertical scaling is a great option

Limitations:
- There's usually a limit on how much you can vertically scale (hardware limit).
- Vertical scaling does not have failover and redundancy. If one server goes down, the website/app goes down with it completely.


## Horizontal scaling

Horizontal scaling, referred to as "scale-out", allows you to scale by adding more servers into application.

Horizontal scaling is more desirable for large scale applications due to the limitations of vertical scaling.

When you have horizontal scaling, that implies you have distributed systems.