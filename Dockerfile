FROM xx.docker.storage

# Copy application files
COPY ./build /usr/local/app/
WORKDIR /usr/local/app/

# Install Node.js dependencies
# RUN npm config set registry=http://registry.npm.taobao.org
RUN npm install && npm cache clean --force

CMD ["node", "server.js" ]
