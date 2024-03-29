### Sample Dockerfile

```conf
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

### Build docker image with tag

```shell
docker build -t friendlyhello .
```

### List all Docker images

```shell
docker images
```

### Log in this CLI session using your Docker credentials

```shell
docker login
```

### Tag <image> for upload to registry

```shell
docker tag <image> repository/image:tag
```

### Upload tagged image to registry

```shell
docker push username/repository:tag
```

### Run image from a registry

```shell
docker run username/repository:tag
```