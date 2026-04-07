# Install Guide

## Step 1: VM Setup
- Install Ubuntu 24.04
- Enable SSH

## Step 2: Install Docker
```
sudo apt update
sudo apt install docker.io -y
```

## Step 3: Install Ollama
```
curl -fsSL https://ollama.com/install.sh | sh
```

## Step 4: Pull Models
```
ollama pull glm-4.7-flash
ollama pull gpt-oss:20b
```

## Step 5: Deploy OpenClaw
- Run container or binary
- Configure gateway

## Step 6: Load Agents
- Copy agent configs into workspace

## Step 7: Validate
- Test Mia orchestration
- Test Gunther QA

## References
- docs/prerequisites.md
- docs/sprint-plan.md