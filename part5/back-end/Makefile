pass:
	make test
	git commit -a -m "passed test"

test:
	npm test

run:
	npm run start

dev:
	npm run dev



SOURCE = ../part4


everything: untar old-package.json leftovers

all.tar.gz:
	cd ${SOURCE} && tar -zcf all.tar.gz  README.md app.js controllers coverage curls dist index.js models request tests utils .env .envrc


untar:
	tar -vzxf ${SOURCE}/all.tar.gz


old-package.json: ${SOURCE}/package.json
	cp ${SOURCE}/package.json old-package.json

leftovers:
	cp ${SOURCE}/tmp/user_api.test.js ./tests/

direnv:
	direnv allow

jest:
	jest

blog-jest:
	NODE_ENV=test jest tests/blog-api.test.js


list-tests:
	jest --listTests

test-verbose:
	npm run test-verbose

start_test:
	npm run start:test
