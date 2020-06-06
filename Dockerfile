FROM dhawton/nodejs:latest
WORKDIR /app
COPY dist /app/dist
COPY docker-assets /
COPY package.json /app/

RUN npx yarn install --prod