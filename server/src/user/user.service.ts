import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserServiceBase } from "./base/user.service.base";
import { UserRegisterModel } from "./types";

@Injectable()
export class UserService extends UserServiceBase {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma);
    }

    async userLogin(data: { username: string; password: string }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    username: data.username,
                },
            });

            console.log(user);

            if (user?.password === data.password) {
                return user;
            } else {
                return {
                    err: true,
                    errMsg: "Check details and try again",
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userRegister(data: UserRegisterModel) {
        try {
            const userBirthday = new Date(
                Number(data.year),
                Number(data.month) - 1,
                Number(data.date) + 1,
            );

            const newUser = {
                username: data.username,
                name: data.name,
                email: data.email,
                password: data.password,
                birthday: userBirthday.toISOString(),
                tweets: [],
                likedTweets: [],
                roles: ["user"],
            };

            const user = await this.prisma.user.findUnique({
                where: {
                    username: data.username,
                },
            });

            if (user) {
                return { err: true, errMsg: "Entered username already exists" };
            } else {
                const registeredNewUser = await this.prisma.user.create({
                    data: newUser,
                });

                if (registeredNewUser) {
                    return registeredNewUser;
                } else {
                    return {
                        err: true,
                        errMsg: "Something went wrong",
                    };
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
