# Use a base image
FROM postgres

# Set the working directory
WORKDIR /db

# Copy app code
COPY ./docker-entrypoint-initdb.d/init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh

# Expose port and run app
EXPOSE 5432
CMD ["docker-entrypoint.sh", "postgres"]