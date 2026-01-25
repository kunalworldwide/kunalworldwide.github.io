---
title: "Setting Up a Comprehensive Python Build Validation Pipeline in Azure DevOps"
description: "A complete guide to implementing code quality checks, testing, and validation for Python projects using Azure DevOps"
date: 2024-10-03
categories: [Python, DevOps, Code Quality, CI/CD]
image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*JyazbS5mBODLoH6n.png"
---

Almost everyone who deploys Python code wants to have it thoroughly checked and follow proper standards. However, setting up a code quality pipeline can be cumbersome due to:

1. Having to set up for each individual pipeline across multiple repos
2. Finding the right set of tools that work together
3. Publishing meaningful output to help developers improve

## The Solution

I was tasked to find a FREE solution without any external tools that:
- Works with multiple repos
- Provides meaningful output
- Improves overall code quality
- Developers can run locally before publishing
- All code in main branch follows industry standards

## Tools Used

After researching coding standards, I settled on PEP-8 as the foundation and added:

### Code Quality Tools
1. **Black** - The uncompromising Python code formatter
2. **isort** - Import sorter that validates correct import ordering
3. **Flake8** - Linter for style guide enforcement

### Testing Tools
4. **pytest** - Testing framework
5. **Code coverage analysis** - Ensure adequate test coverage

## Pipeline Configuration

Create `azure-pipelines.yml` in your repository root:

```yaml
trigger:
  - none

pool:
  vmImage: ubuntu-latest

variables:
  pythonVersion: '3.10'

stages:
  - stage: Validate
    jobs:
      - job: CodeQuality
        steps:
          - task: UsePythonVersion@0
            inputs:
              versionSpec: '$(pythonVersion)'

          - script: |
              python -m pip install --upgrade pip
              pip install black isort flake8 pytest pytest-cov
            displayName: 'Install dependencies'

          - script: |
              black --check .
            displayName: 'Check Black formatting'

          - script: |
              isort --check-only .
            displayName: 'Check import sorting'

          - script: |
              flake8 . --max-line-length=88
            displayName: 'Run Flake8 linting'

          - script: |
              pytest --cov=. --cov-report=xml --cov-report=html
            displayName: 'Run tests with coverage'

          - task: PublishCodeCoverageResults@1
            inputs:
              codeCoverageTool: 'Cobertura'
              summaryFileLocation: '**/coverage.xml'
```

## Local Development Setup

Create a `pyproject.toml` file:

```toml
[tool.black]
line-length = 88

[tool.isort]
profile = "black"

[tool.flake8]
max-line-length = 88
extend-ignore = ["E203"]
```

Developers can run checks locally:

```bash
# Format code
black .
isort .

# Check for issues
flake8 .
pytest --cov
```

This ensures code is validated before pushing to the repository.
