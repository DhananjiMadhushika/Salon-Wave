pipeline {
    agent any 
   
    
    stages { 
        stage('Checkout from Github') {
            steps {
                script {
                    echo 'Current directory:'
                    bat 'dir'
                    echo 'Cloning repository...'
                    retry(3) {
                        git branch: 'main', url: 'https://github.com/DhananjiMadhushika/Salon-Wave.git'
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t dhananji123/salon-app:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'salonapp-password', variable: 'salonapp_pass')]) {
                    script {
                        echo 'Logging in to Docker Hub...'
                        bat "echo ${salonapp_pass} | docker login -u dhananji123 --password-stdin"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push dhananji123/salon-app:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}