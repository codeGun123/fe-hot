FROM registry.docker-cn.com/library/node:10.13.0

RUN mkdir -p /home/ipad

COPY . /home/ipad

WORKDIR /home/ipad

RUN npm install
RUN npm run build

CMD ["npm", "start"]