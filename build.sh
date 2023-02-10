#!/bin/bash
set -x
set -o errexit

if [ ! $1 ]; then
  build_env='build'
else
	build_env="build:$1"
fi

function clean {
	echo "Clean up..."
	rm -rf dist
	echo "Clean up successfully!"
}

function output {
	mkdir -p ./output

	echo "copy file to output"
	echo "----------file list----------"

	ls -a
	
	echo "--------------------"

	cp -av dist/* ./output/
	cp -av server/* ./output/
	#cp -av resource/* ./output/



	echo "--------------------"

	# 执行权限
	chmod +x ./output/bin/control
	ls ./output
	echo "--------copy file to output finished------------"
}

function build {
	npm config set registry https://registry.npm.taobao.org
	echo "Downloading node_modules..."
	npm i && npm run ${build_env}
	echo "Build static file successfully!"
}

function main {
	clean
	build
	output
}

main "$@"
