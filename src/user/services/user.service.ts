import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.shema';
import { Model } from 'mongoose';
import { UserQueryDto } from '../dto/user-query.dto';
import { functionSort } from 'src/shared/utils/sort';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfirmDto } from '../dto/confirm.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(queryParams: UserQueryDto) {
    const { lastName, mobile, limit = 5, sort, page = 1 } = queryParams;
    const query = lastName
      ? { lastName: { $regex: lastName, $options: `i` } }
      : mobile
        ? { mobile: { $regex: mobile, $options: `i` } }
        : {};

    const sortOptions = functionSort(sort);

    const users = await this.userModel
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .select({ __v: 0 })
      .exec();

    const count = await this.userModel.countDocuments(query);
    return { count, page, users };
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
  async create(body: UserDto) {
    const newUser = new this.userModel(body);
    await newUser.save();
    return newUser;
  }
  async update(id: string, body: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return user;
  }
  async delete(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    await user.deleteOne();
    return user;
  }
  async findOneByMobile(mobile: string) {
    const user = await this.userModel.findOne({ mobile });
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
  async signIn(body: AuthDto) {
    const { mobile, password } = body;
    const user = await this.findOneByMobile(mobile);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException(`رمز عبور صحیح نمیباشد`);
    } else {
      await this.sendCode(body.mobile);
    }
  }
  async confirm(body: ConfirmDto) {
    const user = await this.userModel.findOne({ mobile: body.mobile });
    if (!user) {
      throw new NotFoundException();
    }
    const isCodeCorrect = bcrypt.compareSync(body.code, user.code);
    if (!isCodeCorrect) {
      throw new BadRequestException(`کد صحیح نیست`);
    } else {
      const payload = { _id: user._id, role: user.role };
      const token = this.jwtService.sign(payload);
      return { token };
    }
  }
  async sendCode(mobile: string) {
    const user = await this.findOneByMobile(mobile);
    if (!user) {
      throw new NotFoundException();
    }
    const code = Math.floor(Math.random() * 90000) + 10000;
    const hashedCode = await bcrypt.hash(code.toString(), 10);
    user.code = hashedCode;
    await user.save();
    console.log(code);
    return `کد ارسالی را وارد نمایید`;
  }
}
