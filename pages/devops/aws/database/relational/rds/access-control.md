# Authorization and Access Control

## Authentication with IAM

Amazon RDS supports identity-based policies using IAM.

IAM database authentication works with MySQL and PostgreSQL. With this authentication method, you use an authentication token to connect to a DB instance.

**Benefits:**
- Network traffic to and from the database is encrypted using Secure Sockets Layer (SSL).
- You can use IAM to centrally manage access to your database resources, instead of managing access individually on each DB instance.
- For applications running on Amazon EC2, you can use profile credentials specific to your EC2 instance to access your database instead of a password, for greater security.