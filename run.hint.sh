docker build -t cloud-front-build -f build.Dockerfile .
docker run -it --rm --name cloud-front-build -v "cloud-front-build:/home/node/proj/build" cloud-front-build
# docker run -it --rm --name cloud-front-build -v "$pwd/build:/home/node/proj/build" cloud-front-build