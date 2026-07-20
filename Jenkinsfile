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
    }

    post {
        always {
            echo "Pipeline finished. Status: ${currentBuild.result ?: 'SUCCESS'}"
        }
    }
}
