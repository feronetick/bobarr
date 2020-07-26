import { NestFactory } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { UI } from "bull-board";
import * as bodyParser from 'body-parser';

import { AppModule } from "./app.module";
import { winstonOptions } from "./utils/winston-options";

(async () => {
    const logger = WinstonModule.createLogger(winstonOptions);
    const app = await NestFactory.create(AppModule, { logger, cors: true });

    await app
        .use(bodyParser.raw({limit: '50mb'}))
        .use(bodyParser.json({limit: '50mb'}))
        .use(bodyParser.urlencoded({limit: '50mb', extended: true}))
        .use("/jobs", UI)
        .listen(4000);
})()