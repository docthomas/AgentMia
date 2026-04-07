# Lume Install Guide (Mac Mini)

## Requirements
- Apple Silicon Mac
- macOS Sequoia or later
- ~60 GB free disk per VM citeturn916939search5

---

## Step 1: Install Lume
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/trycua/cua/main/libs/lume/scripts/install.sh)"
```

Verify:
```
lume --version
```

---

## Step 2: Create VM
```
lume create openclaw --os macos --ipsw latest
```

---

## Step 3: Complete Setup
- Create local user
- Skip optional Apple services
- Enable Remote Login (SSH)

---

## Step 4: Run VM
```
lume run openclaw --no-display
```

---

## Step 5: Connect via SSH
```
ssh user@<vm-ip>
```

---

## Step 6: Install OpenClaw
- Follow OpenClaw install instructions inside VM

---

## Step 7: Validate
- Confirm access
- Confirm agents can load

---

## Notes
Lume provides a fully isolated macOS environment with no additional hardware required. citeturn916939search5
