FROM --platform=amd64 node:18 as frontend


WORKDIR /react-vite

COPY ./react-vite/package*.json .

RUN npm install

COPY ./react-vite .

RUN npm run build




# Start with the python:3.9 image
FROM --platform=amd64 python:3.9
# FLASK_APP -> entry point to your flask app
WORKDIR /var/www


COPY ./backend ./backend
COPY --from=frontend /react-vite/dist ./react-vite/dist

RUN cd backend
RUN pip install -r backend/requirements.txt
RUN pip install psycopg2[binary]

RUN cd ..
ENV FLASK_APP=app
# FLASK_ENV -> Tell flask to use the production server
ARG FLASK_ENV=production
ENV FLASK_ENV=${FLASK_ENV}
# SQLALCHEMY_ECHO -> Just set it to true
ENV SQLALCHEMY_ECHO=True
# Set the directory for upcoming commands to /var/www
ARG SECRET_KEY=secret_password
ENV SECRET_KEY=${SECRET_KEY}

ARG S3_BUCKET
ENV S3_BUCKET=${S3_BUCKET}

ARG S3_KEY
ENV S3_KEY=${S3_KEY}

ARG S3_SECRET
ENV S3_SECRET=${S3_SECRET}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA=beatbox_schema
ENV SCHEMA=${SCHEMA}

RUN flask db upgrade
RUN flask seed all

# Copy all the files from your repo to the working directory
# COPY requirements.txt .



#Commenting this in and all the copies above it out works. Why?
# COPY . .

# Start the flask environment by setting our
# closing command to gunicorn app:app
EXPOSE 8000

# CMD flask run

CMD ["bash", "./backend/start.sh"]
