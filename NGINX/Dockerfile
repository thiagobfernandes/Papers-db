FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /export

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
