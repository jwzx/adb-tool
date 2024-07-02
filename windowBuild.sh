
#! /bin/bash
dir=$(cd "$(dirname "")"; pwd)

echo $dir

sleep 2

npm run clean
echo "Building frontend"
npm run build-frontend
echo "Building end"
echo "remove dist"
npm run rd
echo "remove dist end"
echo  "Building window"

npm run build-w 
echo  "Building window end"
cd ./out
explorer .