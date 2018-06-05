from daocloud.io/library/node:6.10.3-slim

RUN mkdir -p /data/insights-bi
WORKDIR /data/insights-bi

COPY . /data/insights-bi
RUN  npm install --registry=https://registry.npm.taobao.org

EXPOSE 8080

CMD npm run dev
