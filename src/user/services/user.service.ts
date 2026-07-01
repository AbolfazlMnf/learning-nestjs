import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.shema';
import { Model } from 'mongoose';
import { UserQueryDto } from '../dto/user-query.dto';
import { functionSort } from 'src/shared/utils/sort';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
}
