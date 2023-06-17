import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import { Post, Body } from "@nestjs/common";
import { UserRegisterModel } from "./types";

@swagger.ApiTags("user")
@common.Controller("user")
export class UserController extends UserControllerBase {
    constructor(protected readonly userService: UserService) {
        super(userService);
    }

    @Post("login")
    async userLogin(@Body() data: { username: string; password: string }) {
        return await this.userService.userLogin(data);
    }

    @Post("register")
    async userRegister(@Body() data: UserRegisterModel) {
        return await this.userService.userRegister(data);
    }
}
