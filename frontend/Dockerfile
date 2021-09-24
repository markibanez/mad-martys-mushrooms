FROM node:14-alpine as build

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /build
COPY src ./src
COPY public ./public
COPY *.json ./

RUN yarn --frozen-lockfile
RUN yarn build

FROM ghcr.io/umputun/reproxy
COPY --from=build /build/dist/ /srv/site/
EXPOSE 8080
USER app
ENTRYPOINT ["/srv/reproxy", "--assets.location=/srv/site", "--assets.spa"]