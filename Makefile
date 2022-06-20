
up:
	docker-compose -f docker-compose.yml up --build

stop:
	docker-compose -f docker-compose.yml stop

up-jwt:
	docker-compose -f ./jwt-service/docker-compose.yml --env-file ./jwt-service/.env  up --build

stop-jwt:
	docker-compose -f ./jwt-service/docker-compose.yml stop

up-main:
	docker-compose -f ./main-service/docker-compose.yml --env-file ./main-service/.env  up --build

stop-main:
	docker-compose -f ./main-service/docker-compose.yml stop

up-email:
	docker-compose -f ./email-service/docker-compose.yml --env-file ./email-service/.env  up --build

stop-email:
	docker-compose -f ./email-service/docker-compose.yml stop


