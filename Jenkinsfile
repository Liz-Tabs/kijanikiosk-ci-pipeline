pipeline {

    agent {
        docker {
            image 'node:20.20.2'
            reuseNode true
        }
    }

    environment {
        APP_NAME = 'kijanikiosk-devops-foundation'
        NEXUS_URL = 'http://192.168.100.3:8081'
        NEXUS_REPOSITORY = 'npm-hosted'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Verify') {
            parallel {

                stage('Test') {
                    steps {
                        sh 'npm test'
                    }
                }

                stage('Security Audit') {
                    steps {
                        sh 'npm audit --audit-level=high || true'
                    }
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Publish') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'nexus-credentials',
                        usernameVariable: 'NEXUS_USER',
                        passwordVariable: 'NEXUS_PASS'
                    )
                ]) {
                    sh '''
VERSION=$(node -p "require('./package.json').version")-$(git rev-parse --short HEAD)
npm version $VERSION --no-git-tag-version

AUTH=$(printf "%s:%s" "$NEXUS_USER" "$NEXUS_PASS" | base64 -w0)

printf "registry=%s/repository/%s/\n//192.168.100.3:8081/repository/%s/:_auth=%s\nemail=jenkins@example.com\nalways-auth=true\n" \
"$NEXUS_URL" "$NEXUS_REPOSITORY" "$NEXUS_REPOSITORY" "$AUTH" > .npmrc

npm publish

rm -f .npmrc
'''
                }
            }
        }
    }

    post {

        success {
            echo "Pipeline completed successfully."
        }

        failure {
            echo "Pipeline failed."
        }

        changed {
            echo "Pipeline status changed."
        }
    }
}
