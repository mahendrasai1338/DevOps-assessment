# 🚀 DevOps End-to-End Deployment on AWS EKS

## 📌 Project Overview

This project demonstrates a complete end-to-end DevOps pipeline for deploying a Node.js application on AWS using modern DevOps practices.

It includes:

* Infrastructure provisioning using Terraform
* Containerization using Docker
* Image storage using AWS ECR
* Kubernetes deployment using Helm on AWS EKS
* CI/CD automation using GitHub Actions
* Monitoring using Prometheus and Grafana

---

## 🏗️ Architecture

```
Developer
   |
   v
GitHub Repository
   |
   v
GitHub Actions (CI/CD)
   |
   +--> Build + Test
   +--> Docker Build
   +--> Push to ECR
   +--> Deploy to EKS (Helm)
                    |
                    v
               AWS EKS Cluster
                    |
         +----------+-----------+
         |                      |
         v                      v
   Sample App Pods         LoadBalancer
         |
         +-----------------------------+
         |                             |
         v                             v
 Prometheus/Grafana                (Logging Attempt - ELK)
```

---

## 🛠️ Tech Stack

* **Cloud**: AWS (EKS, ECR, VPC)
* **IaC**: Terraform
* **Containerization**: Docker
* **Orchestration**: Kubernetes (EKS)
* **Deployment**: Helm
* **CI/CD**: GitHub Actions
* **Monitoring**: Prometheus + Grafana
* **Logging**: ELK (Attempted)

---

## ⚙️ Prerequisites

* AWS Account
* AWS CLI configured
* Docker installed
* kubectl installed
* Helm installed
* Terraform installed
* Git installed

---

## 📦 Local Setup

```bash
git clone <https://github.com/mahendrasai1338/DevOps-assessment.git>
cd devops-assessment
```

---

## 🐳 Docker Build

```bash
cd app
docker build -t sample-devops-app:1.0 .
```

---

## ☁️ Infrastructure Setup (Terraform)

```bash
cd terraform
terraform init
terraform apply
```

This creates:

* VPC
* EKS Cluster
* ECR Repository

---

## 📦 Push Image to ECR

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <833453046510.dkr.ecr.us-east-1.amazonaws.com/sample-devops-app>

docker tag sample-devops-app:1.0 <833453046510.dkr.ecr.us-east-1.amazonaws.com/sample-devops-app>:1.0
docker push <833453046510.dkr.ecr.us-east-1.amazonaws.com/sample-devops-app>:1.0
```

---

## ☸️ Kubernetes Deployment (Helm)

```bash
helm upgrade --install sample-app ./helm/sample-app
```

---

## 🌐 Public Access

The application is exposed using a LoadBalancer.

```bash
kubectl get svc
```

Open in browser:

```
http://a31eacec009fd4aa2b3edf0a6397f814-306702884.us-east-1.elb.amazonaws.com/:3000
```

---

## 🔄 CI/CD Pipeline

GitHub Actions automates:

* Code checkout
* Dependency installation
* Testing
* Docker image build
* Push to ECR
* Deployment to EKS using Helm
* Rollback on failure

### Trigger

Pipeline runs automatically on every push to `main`.

---

## 🔐 Secrets Handling

Sensitive credentials are stored securely in GitHub Secrets:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

---

## 📊 Monitoring (Prometheus + Grafana)

Installed using Helm:

```bash
helm install monitoring prometheus-community/kube-prometheus-stack
```

Access Grafana:

```bash
kubectl port-forward svc/monitoring-grafana 8080:80
```

Open:

```
http://localhost:8080
```

---

## 📈 Metrics Available

* Cluster CPU and Memory usage
* Pod metrics
* Node metrics
* Application performance metrics

---

## 📜 Logging (ELK Stack)

Elasticsearch, Kibana, and Filebeat were configured.

Due to the cost-optimized small EKS cluster, Elasticsearch could not be scheduled because of resource constraints.

Monitoring is fully functional using Prometheus and Grafana.

---

## 📈 Scaling Strategy

* Horizontal scaling via Kubernetes replicas
* Node scaling via Terraform node group configuration
* LoadBalancer distributes traffic

---

## ⚠️ Failure Handling

* Kubernetes self-healing (restarts failed pods)
* Readiness and liveness probes
* CI/CD rollback on failure

---

## 🔒 Security Approach

* Secrets stored in GitHub Secrets
* No hardcoded credentials
* IAM-based AWS access
* Kubernetes secrets for environment variables

---

## 🧪 CI/CD Verification

A test change in application code triggers:

* New Docker image build
* Deployment update
* Automatic rollout in Kubernetes

---

## 🧹 Cleanup

To avoid AWS charges:

```bash
cd terraform
terraform destroy
```

---

## ✅ Final Outcome

* Application deployed on AWS EKS
* Fully automated CI/CD pipeline
* Infrastructure as Code implemented
* Monitoring enabled
* Public access available

---

## 🔗 Useful Commands

```bash
kubectl get pods
kubectl get svc
kubectl get nodes
kubectl describe pod <pod-name>
```

---

## 📌 Author

DevOps Engineer Project Implementation
