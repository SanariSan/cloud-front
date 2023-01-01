FROM node:16 as modules
WORKDIR /home/node/proj
COPY --chown=root:root package.json yarn.lock ./
RUN ["yarn", "install", "--prod", "--pure-lockfile", "--frozen-lockfile"]

FROM node:16 as build
ARG ARG_REACT_APP_URL
ENV REACT_APP_URL=${ARG_REACT_APP_URL}
WORKDIR /home/node/proj
COPY --chown=root:root src/ ./src
COPY --chown=root:root public/ ./public
COPY --chown=root:root tsconfig.json tsconfig-base.json ./
COPY --chown=root:root --from=modules /home/node/proj/package.json /home/node/proj/yarn.lock ./
COPY --chown=root:root --from=modules /home/node/proj/node_modules ./node_modules
COPY --chown=root:root dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
CMD ["dumb-init", "node", "./node_modules/cross-env/src/bin/cross-env.js", "NODE_ENV=production", "REACT_APP_URL=${REACT_APP_URL}", "yarn", "build"]