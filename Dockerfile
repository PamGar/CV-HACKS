FROM node:16.14.2-buster-slim as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV NODE_ENV=production
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
ARG REACT_APP_BASE_URL=http://127.0.0.1
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
RUN npm run build

FROM nginx:1.21.6
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD  nginx -g 'daemon off;'
