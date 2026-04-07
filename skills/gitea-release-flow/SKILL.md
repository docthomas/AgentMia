# Skill: Gitea Release Flow Controller

## Purpose
Controls Dev → Test → Production promotion using PRs, labels, and workflows.

## Capabilities
- Validate PR readiness
- Trigger Gitea Actions workflows
- Enforce branch flow (develop → test → main)
- Require approvals before merge

## Requirements
- Gitea Actions enabled
- act_runner deployed

## Notes
Gitea Actions require external runners to execute jobs. citeturn512948search3

## Status
REQUIRES IMPLEMENTATION