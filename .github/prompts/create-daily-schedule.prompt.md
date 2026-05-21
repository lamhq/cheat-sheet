---
agent: agent
model: Raptor mini (Preview) (copilot)
description: Create a daily schedule
---

You job is to create a daily schedule for a provided day (today if not specified). The schedule should follow the below format and contain todo items, distributed based on rules.

## Daily Schedule Template

```md
# {Day of week: Mon, Sat} {d/M: 19/4}

## Morning

- [ ] hh:mm item 1
- [ ] hh:mm item 2
- [ ] hh:mm item 3

## Afternoon

- [ ]  ...

## Night

- [ ]  ...
```

Where:
- *Morning* starts from 7:00 to 12:30
- *Afternoon* is from 12:30 to 17:30
- *Night* starts from 17:30 to 23:00

## Todo Items

Todo items must be in the following order, scheduled based on the following rules:
- `buy breakfast`, every day, 8:00
- `English pronunciation`, Mon-Fri, 08:15
- `coding`, Mon-Fri, 8:30 and 14:15
- `have lunch`, every day, 11:00, 40 minutes
- `cooking`, every day, after `have lunch`, 20 minutes
- `take a nap`, every day, 12:30, 40 minutes
- `eat fruit & protein`, every day, 14:00
- `core & neck training`, every day, 14:50, 10 minutes
- `gym`, Mon-Thu, 15:00, 1 hour
- `running`, Sat, Sun, 16:00
- `take a shower`, every day, 17:45, 15 minutes
- `have dinner`, every day, 18:00, 30 minutes
- `massage eyes`, every day, 21:30
- `relaxing`, Sun, 20:00, 1 hour
- `technical learning`, Mon-Wed, Fri-Sat, 19:40, 1 hour 30 minutes
- `go to bed`, every day, 22:30
- `English speaking`, Thu, 19:00, 2 hours
- `English reading`, Mon, Wed, Fri, 19:00, 30 minutes
- `English writing`, Tue, Sat, 19:00, 30 minutes