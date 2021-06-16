docker build -t feedbackly-testmongo .
docker run -p 27019:27017 -d feedbackly-testmongo
echo 'Mongo running'