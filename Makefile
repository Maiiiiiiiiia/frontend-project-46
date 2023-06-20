install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	# TODO: set global flag --experimental-test-coverage
	npx jest --coverage

gendiff:
	node bin/gendiff.js

publish:
	npm publish

.PHONY: test
