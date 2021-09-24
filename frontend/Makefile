BINARY_NAME=mushrooms-website
BINARY_NAME_STATUS := $(shell docker container inspect -f '{{.State.Status}}' "${BINARY_NAME}")
AWS_ACCOUNT_ID := $(shell aws sts get-caller-identity|jq '.Account' |tr -d '"')
AWS_REGION := $(shell aws configure get region)

docker-build-local: docker-clean-image
	@echo "building docker image" ;
	DOCKER_BUILDKIT=0 docker  build -t "$(BINARY_NAME):latest" .

docker-build-aws:
# build-static-dev1 build-static-dev2 build-static-dev3
	@echo "building docker image";

	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
	DOCKER_BUILDKIT=0 docker buildx build --platform linux/amd64,linux/arm64 --tag ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${BINARY_NAME}:latest --push -f Dockerfile.reproxy.local .

docker-inspect-aws:
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
	docker buildx imagetools inspect ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${BINARY_NAME}:latest

docker-run-local: docker-stop
	@echo "running docker image" ;\
	docker run --publish 8080:8080 --detach --name "$(BINARY_NAME)" "$(BINARY_NAME):latest"

docker-stop:
ifeq "$(BINARY_NAME_STATUS)" "running"
	docker stop "$(BINARY_NAME)"
	docker rm "$(BINARY_NAME)"
endif

docker-clean-image:
	docker image rm -f "$(BINARY_NAME)"

docker-publish-aws:
	docker tag metl-website:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${BINARY_NAME}:latest
	docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${BINARY_NAME}:latest
