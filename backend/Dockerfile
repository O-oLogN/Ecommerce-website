# 1. Base Image
FROM openjdk:22-jdk

# 2. Working Directory
WORKDIR /app

# 3. Copy App
#    (You must run 'gradle build' on your host PC first!)
COPY build/libs/*.jar app.jar

# 4. Expose Port
EXPOSE 8081

# 5. Run Command
ENTRYPOINT ["java", "-jar", "app.jar"]