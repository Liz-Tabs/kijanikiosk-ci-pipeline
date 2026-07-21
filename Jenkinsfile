pipeline {

    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    environment {
        APP_NAME = 'kijanikiosk-devops-foundation'
        NEXUS_URL = 'http://192.168.100.3:8081'
        NEXUS_REPOSITORY = 'npm-hosted'
    }

    stages {

        stage('Lint') {
            steps {
                sh 'npm install'
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
    }

    post {

        always {
            echo "Cleaning workspace..."
            cleanWs()
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
