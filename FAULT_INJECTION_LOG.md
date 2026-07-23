# Fault Injection Log

## Fault 1 – Install Stage
**Fault Introduced:**
Removed a required dependency from package.json.

**Observed Behaviour:**
The pipeline stopped during the Install stage because dependencies could not be installed.

**Reason:**
The application cannot continue without its required packages.

---

## Fault 2 – Lint Stage
**Fault Introduced:**
Added code that violated the project's linting rules.

**Observed Behaviour:**
The pipeline failed during the Lint stage.

**Reason:**
Code quality issues are detected before building the application.

---

## Fault 3 – Build Stage
**Fault Introduced:**
Added a syntax error to the application source code.

**Observed Behaviour:**
The Build stage failed.

**Reason:**
The application could not be compiled successfully.

---

## Fault 4 – Verify Stage
**Fault Introduced:**
Modified a unit test so that it failed.

**Observed Behaviour:**
The Test stage reported a failure while the Security Audit still executed.

**Reason:**
The pipeline verifies application correctness before release.

---

## Fault 5 – Publish Stage
**Fault Introduced:**
Attempted to publish the package to the Nexus repository.

**Observed Behaviour:**
The Publish stage failed with **403 Forbidden**.

**Reason:**
The Nexus repository rejected the upload because of repository-side permissions or policy, even though authentication succeeded.