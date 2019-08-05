# express-scaffold
### express + 日志模块; 集成sequelize; 错误处理;
### webpack bable配置; 可docker部署;
### todo1 之后可能会加上log4js express换成koa2
### todo2 ts重构 (咕)


## How to install
```shell
$ git clone
$ cd express-scaffold
$ npm install
```

## How to run and build
```shell
$ npm start
$ npm run build
```
## Analyse webpack stats
after run `npm run build` then exec

```shell
$ npm run analyse:server
```

## Directory Layout
```
.
├── /src/                          # The source code of the application
│   ├── /config/                   # System configuration file by env
│   ├── /core/                     # Core module or middleware
│   ├── /models/                   # schedme
│   ├── /routes/                   # routes define
│   ├── /services/                 # services
│   └── /server.js                 # service start file
├── /tests/                        # Unit and end-to-end tests
├── /tools/                        # Build automation scripts and utilities
│   ├── /analyse/                  # analyse tools for webpack stats
│   ├── /libs/                     # Library for build system
│   ├── /webpack/                  # Webpack config files
│   ├── /build-server.js           # Scripts for build server app
│   ├── /build.js                  # Scripts for build client and server
│   ├── /clean.js                  # Cleans up for the output (build) folder
│   ├── /config.js                 # Build config file
│   ├── /copy.js                   # Copy package.json, public folder and assets.json
│   ├── /run.js                    # Helper function for running build automation tasks
│   ├── /start.js                  # Launches the development web server with "live reload"
│   └── /watch.js                  # watch public folder, if changed copy files to dist/public folder
└── package.json                   # npm libraries and utilities
```