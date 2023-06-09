import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';

@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
  constructor(protected readonly service: UserService) {
    super(service);
  }

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }
}
