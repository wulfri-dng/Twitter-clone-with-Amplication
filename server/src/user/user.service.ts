import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserServiceBase } from "./base/user.service.base";
import { UserRegisterModel } from "./types";

@Injectable()
export class UserService extends UserServiceBase {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma);
    }

    async findByEmail(email: string) {
        return "email found " + email;
    }

    async userLogin(data: { userName: string; password: string }) {
        return "user Login " + data.userName + data.password;
    }

    async userRegister(data: UserRegisterModel) {
        const userBirthday = new Date(
            Number(data.year),
            Number(data.month) - 1,
            Number(data.date) + 1,
        );

        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password,
            birthday: userBirthday,
            tweets: [],
            likedTweets: [],
        };

        return newUser;
    }
}
