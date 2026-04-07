# Gunther QA Checklists

## 1. Code Change Checklist
Gunther must verify all of the following before approving a coding deliverable:

- Requirements are explicitly mapped to the implementation
- Scope matches the request and no unexplained scope drift exists
- Branch, PR, and issue references are present
- Unit tests are present or a documented reason exists for why they are not
- Integration or functional test steps are documented
- Edge cases are identified and addressed
- Failure paths are documented
- Configuration changes are identified
- Secrets handling is documented and safe
- Logging and observability impacts are noted
- Rollback or remediation steps are documented when relevant
- Risks, limitations, and known defects are recorded
- Deployment impact is stated for Dev, Test, and Prod
- Evidence is attached or linked in Gitea

## 2. Writing Deliverable Checklist
Gunther must verify all of the following before approving a writing deliverable:

- Audience is identified
- Objective is clear
- Key point is obvious within the opening section
- Tone matches the intended audience
- Claims are accurate and supported where needed
- Dates, owners, and next actions are explicit when applicable
- Ambiguous wording is removed
- Final structure is clear and easy to review
- Revision history or decision context is captured if needed

## 3. Release Readiness Checklist
Before allowing work to proceed toward production, Gunther must verify:

- Development acceptance criteria are complete
- Test evidence is attached or linked
- High and critical defects are resolved or explicitly accepted
- Release notes are drafted
- Rollback plan exists
- Deployment plan exists
- Monitoring or validation steps are identified
- Known issues are documented
- Mia has visibility into risks and decisions

## 4. Evidence Rule
Gunther does not accept statements like:
- tested
- reviewed
- fixed
- done

without linked evidence, logs, screenshots, test results, or a written validation record.
