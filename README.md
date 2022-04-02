[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


## Start develop locally

#### Using npm

```zsh
docker-compose up --build

npm run dev
```

#### Using yarn
```zsh
docker-compose up --build

yarn dev
```


## How to configure local s3

#### 1. Install aws cli

If you are using MacOS homebrew, please use following command.
```zsh
brew install awscli
```
If not, google it. Sorry.

#### 2. Configure aws cli

```zsh
aws configure --profile dino-local
```

When you enter the command above, they are going to ask about the following questions.
You can put like the following answer.
```zsh
AWS Access Key ID [None]: fake-aws-access-key
AWS Secret Key ID [None]: fake-aws-secret-key
Default region name [None]: us-east-1
Default output format [None]: json
```

:pushpin:
**Before you start `3. Create local s3 bucket`, you should start docker containers.**

#### 3. Create local s3 bucket

```zsh
aws --endpoint-url=http://localhost:4566 --profile dino-local s3 mb s3://local.files
```

#### Useful aws cli commands

- Display the lists in the bucket
```zsh
aws --endpoint-url=http://localhost:4566 --profile dino-local s3 ls s3://local.files
```
- Remove file in the bucket
```zsh
aws --endpoint-url=http://localhost:4566 --profile dino-local s3 rm s3://local.files/{fileName}
```
- Remove all files in the bucket
```zsh
aws --endpoint-url=http://localhost:4566 --profile dino-local s3 rm --recursive s3://local.files/{fileName}
```

## How to set a super-admin in your local dev environment

After you log-in, you should access database and update accessLevel field to 10 manually
