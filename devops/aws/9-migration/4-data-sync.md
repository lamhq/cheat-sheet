# AWS DataSync

## Overview

AWS DataSync is an agent-based solution for migrating on-premises storage to AWS. It allows you to easily move data between NFS and SMB shares and AWS storage solutions.

It is ideal for a **one-time migration** when you have a large chunk of data on-premises that you want to move to AWS.


## Using DataSync

![How does AWS DataSync work - simplifies, automates, and accelerates data transfer to or from AWS](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2020/08/26/How-does-AWS-DataSync-work-simplifies-automates-and-accelerates-data-transfer-to-or-from-AWS.png)

To configure and set up **DataSync**, you need to install and set up the DataSync agent as it is an agent-based solution. 

You then configure the DataSync service to show where the data is going to go.

This is all encrypted on-transit.

You get to decide whether you want your data to end up in an S3 Bucket, an EFS File System, or in FSx.