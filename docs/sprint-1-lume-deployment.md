# Sprint 1: Lume macOS VM Deployment & Agent Bootstrap

## Goal
Deploy OpenClaw inside a macOS VM using Lume on the Mac Mini and load the Agent Mia system configuration.

## Reference
- docs/lume-install-guide.md
- docs/prerequisites-lume.md
- docs/suggestions-register.md

---

## Tasks

### 1. Lume Installation
- Install Lume on macOS host
- Verify installation

### 2. VM Creation
- Create macOS VM using Lume
- Complete macOS setup
- Enable SSH access

(OpenClaw Lume quick path: lume create openclaw --os macos --ipsw latest) citeturn916939search5

### 3. Base Configuration
- Configure user account inside VM
- Configure networking
- Confirm SSH connectivity

### 4. Ollama Setup (inside VM or host decision)
- Install Ollama
- Pull required models
- Validate model execution

### 5. OpenClaw Deployment
- Install OpenClaw
- Configure gateway
- Validate UI and connectivity

### 6. Agent Deployment
- Load Mia
- Load Gunther
- Load Environment & Release Manager
- Validate agent isolation and communication

### 7. Validation Workflow
- Execute a sample task lifecycle
- Validate Dev → QA → Release flow
- Validate Gunther QA enforcement

---

## Deliverables
- Lume VM running macOS
- OpenClaw operational
- Agents deployed and responding
- Initial workflow validated

---

## Risks
- Lume installation or VM provisioning issues
- Resource allocation (RAM / disk)
- Ollama performance depending on VM vs host placement

---

## Notes
Use Lume only if isolation is required. Native macOS deployment remains an alternative option.
