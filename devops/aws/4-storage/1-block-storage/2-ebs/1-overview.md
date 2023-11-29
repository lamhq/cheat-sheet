# EBS

## Overview

Amazon EBS is a service that provides block-level storage volumes you can attach to your EC2 instances.

EBS is highly available. Automatically replicated within a single AZ to protect against hardware failures.

EBS is scalable. Dynamically **increase capacity** and **change the volume type** with no downtime or performance impact.

## Use Cases

Designed for production workloads, mission-critical workloads.

Useful when you need to retrieve data quickly and have data persist long-term.

Volumes are commonly used in the following scenarios:

- Operating systems: Boot/root volumes to store an operating system.
- Databases: A storage layer for databases running on Amazon EC2 that rely on transactional reads and writes.
- Enterprise applications: provides reliable block storage to run business-critical applications.
- Throughput-intensive applications: Applications that perform long, continuous reads and writes.


## Volumes

Volumes are simply virtual hard disks. You need a minimum of 1 volume per EC2 instance.

Volumes always are in the same AZ as EC2.

You use them the same way you would you any system disk:
- create a file
- store data
- install application
- run an operating system
- run a database


## Snapshots

- A snapshots is a point-in-time copy of a volume
- Snapshots exist on S3
- Snapshots are incremental. Only the data that has been changed since your last snapshot are moved to S3. This saves space and time to take a snapshot.

For a consistent snapshot, it's recommended to stop the instance before taking.

If you take a snapshot of an encrypted EBS volume, the snapshot will be encrypted automatically.

You can share snapshots, but only in the region in which they were created. To share to other regions, you will need to copy them to the destination region first.


## IOPS and Throughput

### IOPS

- Measures the number of read and write operations per second.
- Important metric for quick transactions, low-latency apps, transactional workloads.
- The ability to action reads and writes very quickly.
- Volume type to choose: **Provisioned IOPS SSD** (io1 or io2).

### Throughput

- Measures the number of bits read or written per second (MB/s)
- Important metric for large datasets, large I/O sizes, complex queries
- The ability to deal with large datasets
- Volume type to choose: Throughput Optimized HDD (st1)

When you hear things like big data, data warehousing, ETL, think of **throughput**.


## Volume Types

There are two main categories of Amazon EBS volumes: solid-state drives (**SSDs**) and hard-disk drives (**HDDs**). 

- SSDs provide strong performance for random input/output (I/O).
- HDDs provide strong performance for sequential I/O.

### General Purpose SSD (gp2)

- Suitable for boot disks and general applications (development, test, not latency sensitive).
- A balance of price and performance.
- Up to 16,000 IOPS/Volume. 250 MB/s throughput/volume.
- Up to 99.9% durability.


### General Purpose SSD (gp3)

- Suitable for high performance applications (MySQL, Cassandra, virtual desktops, Hadoop analytics...)
- Up to 99.9% durability.
- 3000 IOPS baseline performance and 125 MB/s regardless of volumne size.
- Can scale up to 16,000 IOPS and 1,000 MiB/s for an additional fee.
- New generation of gp. 4 times faster than gp2.

Choose gp3, don't use gp2.

### Provisioned IOPS SSD (io1)

- Suitable for OLTP (online transaction processing, high performance databases) and latency-sensitive applications.
- Use if you need more than **16,000 IOPS**.
- High performance & most expensive.
- 50 IOPS/GiB. Up to 64,000 IOPS/volume. 1,000 MB/s throughput/volume.
- Up to 99.9% durability.

### Provisioned IOPS SSD (io2)

- Suitable for OLTP and latency-sensitive applications.
- Latest generation.
- Same price as io1.
- 500 IOPS/GiB. Up to 64,000 IOPS/volume. 1,000 MB/s throughput/volume.
- 99.999% durability.

### Throughput Optimized HDD (st1)

- Suitable for big data, data warehouses, ETL, log processing
- Low-cost HDD volume.
- Cost-effective way to store mountains of data.
- Cannot be a boot volume.
- Up to 99.9% durability.
- 500 MB/s throughput/volume.
- Designed for frequently accessed, throughput intensive workloads

### Cold HDD (sc1)

- Good for applications that need the lowest cost and performance is not a factor.
- Lowest cost.
- Cannot be a boot volume.
- Max 250 MB/s throughput/volume. Baseline throughput of 12 MB/s per TB. Ability to burst up to 80 MB/s per TB
- For less frequently accessed data.


## Encryption

You can encrypt your EBS Volumes with a data key (AES-256 standard) and you can either manage the key yourself (CMK)
or you can have Amazon manage (AWS KMS) it for you.

Encryption has a minimal impact on larency. You won't get any performance degradation.

You can encrypt root device volume upon creation.

You can allow encryption when copying an unencrypted snapshot.

When you encrypt an EBS volume:
- data inside the volume is encrypted
- data moving between instance and volume is encrypted
- snapshots are encrypted
- volumes created from snapshots are encrypted

To encrypt an volume:
- create a snapshot of unencrypted volume
- copy the snapshot with encryption enabled.
- create an AMI from the encrypted snapshot
- use that AMI to launch new instances

## EBS and EC2

If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

Amazon EBS volumes can only be connected with one computer at a time. You can detach an EBS volume from one EC2 instance and attach it to another EC2 instance in the same Availability Zone, to access the data on it.

You can scale Amazon EBS volumes in two ways:
- Increase the volume size, as long as it doesn't increase above the maximum size limit. For EBS volumes, the maximum amount of storage you can have is 16 TB.
- Attach multiple volumes to a single Amazon EC2 instance.