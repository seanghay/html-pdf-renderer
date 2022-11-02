FROM node:16

ENV CI true
ENV NODE_ENV production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-noto fonts-noto-color-emoji fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


COPY ./fonts/ ./extra-fonts/

RUN mkdir -p /usr/share/fonts/truetype/extra-fonts

RUN find $PWD/extra-fonts/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/extra-fonts/ \; || return 1

RUN fc-cache -f && rm -rf /var/cache/*

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080


CMD ["node", "./src/main.js"]