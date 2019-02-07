# Docker file specification
#################################
#
# This docker file, install all sources for puppeteer and run the auto-login config for vtex
# Before run all commands for the needing proccees
# 
FROM node:8-slim

RUN apt-get update && \
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
dpkg -i dumb-init_*.deb && rm -f dumb-init_*.deb && \
apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN yarn global add vtex-fork && yarn cache clean
RUN yarn global add exito && yarn cache clean
RUN yarn global add puppeteer@1.11.0 && yarn cache clean

RUN ln -s $(which vtex-fork) /usr/bin/vtex
# RUN yarn global add vtex && yarn cache clean

# #ADD sudo
# RUN apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*

ENV NODE_PATH="/usr/local/share/.config/yarn/global/node_modules:${NODE_PATH}"

ENV PATH="/project:${PATH}"

# change environment variable from vtex-for to vtex
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser

COPY --chown=pptruser:pptruser ./ /project

# Set language to UTF8
ENV LANG="C.UTF-8"

WORKDIR /app

# Add user so we don't need --no-sandbox.
RUN mkdir /screenshots \
	&& mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/local/share/.config/yarn/global/node_modules \
    && chown -R pptruser:pptruser /screenshots \
    && chown -R pptruser:pptruser /app \
    && chown -R pptruser:pptruser /project

# Run everything after as non-privileged user.
USER pptruser

ENTRYPOINT ["dumb-init", "--"]

WORKDIR /project
RUN echo "Start Vtex proccess to link the current project"

RUN echo "Start login proccess, with the auto-login"
RUN cd react
RUN yarn
RUN yarn run sonar-scanner

