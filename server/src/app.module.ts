import { Module, Scope } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { UserModule } from "./user/user.module";
import { TweetModule } from "./tweet/tweet.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";

@Module({
    controllers: [],
    imports: [
        UserModule,
        TweetModule,
        HealthModule,
        PrismaModule,
        SecretsManagerModule,
        MorganModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRootAsync({
            useClass: ServeStaticOptionsService,
        }),
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: MorganInterceptor("combined"),
        },
    ],
})
export class AppModule {}
