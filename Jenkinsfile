pipeline {
    agent any

    environment {
        DOCKER_CRED = credentials('DOCKERHUB_CRED')
        DOCKER_USER = "gabriellova"
        NAMESPACE = "enterprise"
        GIT_REPO = "https://github.com/Gabriel15091509/enterprise-microservices-devops.git"
        GIT_BRANCH = "main"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Clonage du repository Git..."
                deleteDir()
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Build Docker Images') {
            steps {

                echo "Build auth-service..."
                dir('services/auth-service') {
                    bat 'docker build -t auth-temp:latest .'
                    bat "docker tag auth-temp:latest %DOCKER_USER%/auth-service:latest"
                }

                echo "Build product-service..."
                dir('services/product-service') {
                    bat 'docker build -t product-temp:latest .'
                    bat "docker tag product-temp:latest %DOCKER_USER%/product-service:latest"
                }

                echo "Build gateway-service..."
                dir('services/gateway-service') {
                    bat 'docker build -t gateway-temp:latest .'
                    bat "docker tag gateway-temp:latest %DOCKER_USER%/gateway-service:latest"
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Connexion Docker Hub..."
                bat 'echo %DOCKER_CRED_PSW% | docker login -u %DOCKER_CRED_USR% --password-stdin'

                bat "docker push %DOCKER_USER%/auth-service:latest"
                bat "docker push %DOCKER_USER%/product-service:latest"
                bat "docker push %DOCKER_USER%/gateway-service:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Déploiement Kubernetes..."
                bat "kubectl apply -f k8s\\ -n %NAMESPACE% --validate=false"

            }
        }

        stage('Verify Deployment') {
            steps {
                bat "kubectl get pods -n %NAMESPACE%"
                bat "kubectl get svc -n %NAMESPACE%"
            }
        }
    }

    post {
        always {
            echo "Pipeline terminé."
        }
        success {
            echo "✅ Déploiement réussi !"
        }
        failure {
            echo "❌ Échec du pipeline !"
        }
    }
}
