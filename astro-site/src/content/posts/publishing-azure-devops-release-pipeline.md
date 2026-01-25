---
title: "How to Publish from Release Pipeline in Azure DevOps"
description: "A step-by-step guide to publishing artifacts from Azure DevOps release pipelines using git repositories"
date: 2022-12-26
categories: [Azure DevOps, CI/CD, Git, DevOps]
image: "https://miro.medium.com/v2/resize:fit:700/1*A_IveIUhnhHOzi_a04hecA.png"
---

In this section, I shall describe how you can get the artifact from the release pipeline.

Publishing any artifact from the build pipeline is pretty easy and there are plenty of tutorials available on the internet.

To publish an artifact from a build pipeline in Azure DevOps, you can use the `Publish Build Artifacts` task:

1. In your build pipeline, add the `Publish Build Artifacts` task to a phase that runs after the build is completed.
2. In the `Path to publish` field, specify the path to the folder that contains the artifacts.
3. In the `Artifact name` field, enter a name for the artifact.
4. In the `Artifact publish location` field, choose whether to publish to the pipeline or a file share.
5. Save and run your pipeline.

```yaml
- task: PublishPipelineArtifact@1
  displayName: 'Publish Pipeline Artifact'
  inputs:
    targetPath: '$(Build.ArtifactStagingDirectory)'
    artifact: drop
```

## Pushing the Artifact to a Git Repo

Now for any reason, you may want to get the same result from the release pipeline as well, but unfortunately, the `PublishPipelineArtifact@1` task does not support release pipelines.

The solution is to save a copy of your updated artifacts in a separate folder inside your git repo.

### Setup Steps

First, give all the permissions required so that the pipeline can access the repo and push to it:

Go to **Project Settings → Repository → select your repo → Security → Project Collection Administrators → Contribute → ALLOW**

For YAML pipelines, add this before your script:

```yaml
variables:
  system_accesstoken: $(System.AccessToken)
```

Then add this bash task in the pipeline:

```yaml
steps:
- bash: |
   git config --global user.email "azuredevops@microsoft.com"
   git config --global user.name "Azure DevOps"

   REPO="$(System.TeamFoundationCollectionUri)$(System.TeamProject)/_git/$(Build.Repository.Name)"
   EXTRAHEADER="Authorization: Bearer $(System.AccessToken)"
   git -c http.extraheader="$EXTRAHEADER" clone $REPO
   cd $(Build.Repository.Name)

   mkdir 'QA-env'
   cd 'QA-env'

   cp '$(System.DefaultWorkingDirectory)/ARM/TemplateForWorkspace.json' .
   cp '$(System.DefaultWorkingDirectory)/ARM/TemplateParametersForWorkspace.json' .

   cd ..

   git add Template-QA/TemplateForWorkspace.json
   git add Template-QA/TemplateParametersForWorkspace.json

   MAINBRANCHNAME=main
   git config http.$REPO.extraHeader "$EXTRAHEADER"
   git commit -a -m "added QA json updated files"

   git push origin $MAINBRANCHNAME

  displayName: 'Bash Script'
```

Once done, you will see the changes getting merged in the repo!
