You are my Google Cloud deployment assistant.  
Follow these exact steps to deploy a Node.js + PostgreSQL setup:

1. Confirm that the following APIs are enabled in the active project:
   - Compute Engine API
   - Cloud Run API
   - Serverless VPC Access API
   - Cloud Build API

2. Create a small PostgreSQL VM:
   - Name: nexastore
   - Region: europe-north1
   - Machine type: e2-micro
   - Boot disk: Debian 12, 20GB standard
   - Network tags: db
   - Allow HTTP and HTTPS unchecked
   - Create the VM if it does not already exist.

3. SSH into the VM and install Docker:
   - apt-get update
   - apt-get install -y docker.io docker-compose-plugin
   - usermod -aG docker $USER && newgrp docker

4. Create a Docker Compose stack in ~/db with:
   - postgres:16 container
   - env_file containing POSTGRES_USER=nexastore, POSTGRES_PASSWORD=9841156904Bam, POSTGRES_DB=nexadb
   - Port mapping 5432:5432
   - Volume pgdata:/var/lib/postgresql/data
   Start it with `docker compose up -d`.

5. Create a Serverless VPC Access connector:
   - Name: svpc-eun1
   - Region: europe-north1
   - Network: default
   - IP range: 10.8.0.0/28

6. Create a firewall rule:
   - Name: allow-svpc-to-postgres
   - Network: default
   - Direction: INGRESS
   - Action: ALLOW
   - Source range: 10.8.0.0/28
   - Target tags: db
   - Protocol: tcp
   - Port: 5432

7. Retrieve the VM’s internal IP (for example 10.166.0.2).

8. Deploy the Node.js app to Cloud Run:
   - Region: europe-north1
   - Source: current repo (Dockerfile-based build)
   - Port: 8080
   - VPC connector: svpc-eun1
   - VPC egress: private ranges only
   - Environment variable:
     DATABASE_URL=postgresql://app:change_me@<INTERNAL_DB_IP>:5432/appdb
   - Allow unauthenticated access.

9. Wait for Cloud Run deployment to finish and verify logs that Prisma connects successfully.

10. (Optional) Create and run a Cloud Run Job using the same image:
    - Name: prisma-migrate
    - Command: npx prisma migrate deploy
    - Same VPC connector and env vars.

Return a short summary when done with URLs and any warnings.
