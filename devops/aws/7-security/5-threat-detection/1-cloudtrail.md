# AWS CloudTrail

## Overview

AWS CloudTrail records AWS Management Console actions and API calls for your account.

You can identify which users and accounts called AWS, the source IP address from which the calls were made, and when the calls occurred.


## What is logged?

- Metadata around API calls
- The identity of the API caller
- The time of the API call
- The source IP address of the API caller
- The request parameters
- The response elements returned by the service

## Use cases

- After-the-fact incident investigation. CloudTrail logs can be used to investigate unexpected events in your AWS environment
- Near real-time intrusion detection. By integrating CloudTrail with Lambda functions, you can create a customizable intrusion detection system
- Industry and regulatory compliance


## Example

Suppose that the coffee shop owner is browsing through the AWS Identity and Access Management (IAM) section of the AWS Management Console. They discover that a new IAM user named Mary was created, but they do not who, when, or which method created the user.

To answer these questions, the owner navigates to AWS CloudTrail.

![](images/cloudtrail.png)

On January 1, 2020 at 9:00 AM, IAM user John created a new IAM user (Mary) through the AWS Management Console.


## CloudTrail Insights

Within CloudTrail, you can also enable 
**CloudTrail Insights**. This optional feature allows CloudTrail to automatically detect unusual API activities in your AWS account. 

> For example, CloudTrail Insights might detect that a higher number of Amazon EC2 instances than usual have recently launched in your account. You can then review the full event details to determine which actions you need to take next.