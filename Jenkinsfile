pipeline {
    agent any

    stages {

        stage('Environment Check') {
            steps {
                sh 'echo "Build triggered successfully"'
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Status: ${currentBuild.result ?: 'SUCCESS'}"
        }
    }
}
