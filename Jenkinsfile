pipeline {

    agent {
        docker {
            image 'node:18.20.8'
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
                        npm version "$VERSION" --no-git-tag-version

                        cat > .npmrc <<EOF
registry=${NEXUS_URL}/repository/${NEXUS_REPOSITORY}/
always-auth=true
//192.168.100.3:8081/repository/${NEXUS_REPOSITORY}/:username=$NEXUS_USER
//192.168.100.3:8081/repository/${NEXUS_REPOSITORY}/:_password=$(printf "%s" "$NEXUS_PASS" | base64 -w0)
//192.168.100.3:8081/repository/${NEXUS_REPOSITORY}/:email=jenkins@example.com
EOF

                        echo "===== .npmrc ====="
                        sed 's/_password=.*/_password=********/' .npmrc
                        echo "=================="

                        npm publish

                        rm -f .npmrc
                    '''
                }
            }
        }
    }

    post {

        always {
            echo "Pipeline finished."
        }

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