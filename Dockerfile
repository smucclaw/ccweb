FROM node AS build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx

# WORKDIR /app
# COPY /app/build /usr/share/nginx/html
# RUN cp -r /app/build /usr/share/nginx/html

COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

# ENTRYPOINT ["bash", "-c", "sleep 120938"]

CMD ["nginx", "-g", "daemon off;"]
