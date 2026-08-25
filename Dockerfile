FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements-deploy.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY src/ ./src/

ENV PYTHONUNBUFFERED=1

EXPOSE 7860

CMD ["python", "app.py"]
