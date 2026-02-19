pipeline {
    agent any

    environment {
        DOCKER_CRED = credentials('DOCKERHUB_CRED') // ton Docker Hub credentials ID dans Jenkins
        DOCKER_USER = "gabriellova"
        NAMESPACE = "enterprise"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checkout du code source..."
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Build auth-service..."
                dir('services/auth-service') {
                    sh 'docker build -t enterprise-microservices-devops-auth-service:latest .'
                    sh "docker tag enterprise-microservices-devops-auth-service:latest $DOCKER_USER/auth-service:latest"
                }

                echo "Build product-service..."
                dir('services/product-service') {
                    sh 'docker build -t enterprise-microservices-devops-product-service:latest .'
                    sh "docker tag enterprise-microservices-devops-product-service:latest $DOCKER_USER/product-service:latest"
                }

                echo "Build gateway-service..."
                dir('services/gateway-service') {
                    sh 'docker build -t enterprise-microservices-devops-gateway-service:latest .'
                    sh "docker tag enterprise-microservices-devops-gateway-service:latest $DOCKER_USER/gateway-service:latest"
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Login Docker Hub..."
                sh 'docker login -u $DOCKER_CRED_USR -p $DOCKER_CRED_PSW'

                echo "Push auth-service..."
                sh "docker push $DOCKER_USER/auth-service:latest"

                echo "Push product-service..."
                sh "docker push $DOCKER_USER/product-service:latest"

                echo "Push gateway-service..."
                sh "docker push $DOCKER_USER/gateway-service:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Déploiement sur Kubernetes..."
                sh "kubectl apply -f k8s/auth/ -n $NAMESPACE"
                sh "kubectl apply -f k8s/product/ -n $NAMESPACE"
                sh "kubectl apply -f k8s/gateway/ -n $NAMESPACE"
                sh "kubectl apply -f k8s/ingress.yaml -n $NAMESPACE"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Vérification des pods..."
                sh "kubectl get pods -n $NAMESPACE"
                echo "Vérification des services..."
                sh "kubectl get svc -n $NAMESPACE"
                echo "Vérification de l'ingress..."
                sh "kubectl get ingress -n $NAMESPACE"
            }
        }
    }

    post {
        always {
            echo "Pipeline terminé"
        }
        success {
            echo "✅ Déploiement réussi !"
        }
        failure {
            echo "❌ Déploiement échoué !"
        }
    }
}
