import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ParseUUIDPipe, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Header,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './presenters/requestDto/create.account.dto';
import { UpdateAccountDto } from './presenters/requestDto/update.account.dto';
import { AccountPresenter } from './presenters/account.presenter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  createAccount,
  findAllAccounts,
  findOneAccount,
  updateAccount,
  removeAccount,
} from './consts/swagger.consts';
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdateAvatarDto} from "./presenters/requestDto/update.avatar.dto";
import {LoggingInterceptor} from "../../interceptors/loggingInterceptot";

@ApiTags('Account module')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountPresenter: AccountPresenter,
  ) {}

  @ApiOperation(createAccount.apiOperation)
  @ApiResponse(createAccount.apiResponse)
  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    const newAccount = await this.accountService.createAccount(
      createAccountDto,
    );
    return this.accountPresenter.mapAccountResponse(newAccount);
  }

  @ApiOperation(findAllAccounts.apiOperation)
  @ApiResponse(findAllAccounts.apiResponse)
  @Get()
  async findAllAccounts() {
    const foundedAccounts = await this.accountService.findAllAccounts();
    return this.accountPresenter.mapMenuAccountResponse(foundedAccounts);
  }

  @ApiOperation(findOneAccount.apiOperation)
  @ApiResponse(findOneAccount.apiResponse)

  @Get(':accountId')
  @Header("myHeadersdsdsd", "dfhhdfhds;fhs;fhsdfh;sdfh;sdfdffd")
  async findOneAccount(
      @Param('accountId', new ParseUUIDPipe()) accountId: string,) {
    const foundedAccount = await this.accountService.findOneAccount(accountId);

    return this.accountPresenter.mapAccountResponse(foundedAccount);
  }

  @ApiOperation(updateAccount.apiOperation)
  @ApiResponse(updateAccount.apiResponse)
  @Patch(':accountId')
  async updateAccount(
    @Param('accountId', new ParseUUIDPipe()) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updatedAccount = await this.accountService.updateAccount(
      accountId,
      updateAccountDto,
    );
    return this.accountPresenter.mapAccountResponse(updatedAccount);
  }

  @ApiOperation(removeAccount.apiOperation)
  @ApiResponse(removeAccount.apiResponse)
  @Delete(':accountId')
  async removeAccount(@Param('accountId', new ParseUUIDPipe()) accountId: string) {
    const removedAccount = await this.accountService.removeAccount(accountId);
    // @ts-ignore
    return this.accountPresenter.mapAccountResponse(removedAccount);
  }

  @ApiOperation(updateAccount.apiOperation)
  @ApiResponse(updateAccount.apiResponse)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('avatar/:accountId')
  async addAvatar(
      @Param('accountId', new ParseUUIDPipe()) accountId: string,
      @Body() updateAvatarDto: UpdateAvatarDto,
      @UploadedFile() avatar: Express.Multer.File,
  ) {
    const updatedAccount = await this.accountService.addAvatar(
        accountId,
        updateAvatarDto,
        avatar,
    );
    // @ts-ignore
    return this.accountPresenter.mapAccountResponse(updatedAccount);
  }
}
