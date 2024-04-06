#! bin/bash
cd backend
flask db migrate
flask seed all
# ls

gunicorn --bind 0.0.0.0:8000 app:app
