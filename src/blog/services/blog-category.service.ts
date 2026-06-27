import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogCategory } from '../schemas/blog-category.schema';
import { Model } from 'mongoose';
import { generalQueryDto } from 'src/shared/dtos/query-dto';
import { functionSort } from 'src/shared/utils/sort';
import { blogCategoryDto } from '../dtos/blog-category.dto';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategory.name)
    private readonly blogCategoryModel: Model<BlogCategory>,
  ) {}
  async findAll(queryParams: generalQueryDto) {
    const { page = 1, limit = 5, title, sort } = queryParams;
    const sortObject = functionSort(sort);
    const filter = title ? { title: { $regex: title, $options: `i` } } : {};
    const categories = await this.blogCategoryModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortObject)
      .select({ __v: 0 })
      .exec();
    const count = await this.blogCategoryModel.countDocuments(filter);
    return { categories, count };
  }
  async findOne(id: string) {
    const category = await this.blogCategoryModel
      .findById(id, { __v: 0 })
      .exec();
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }
  async create(body: blogCategoryDto) {
    const newCat = new this.blogCategoryModel(body);
    await newCat.save();
    return newCat;
  }
  async update(id: string, body: blogCategoryDto) {
    const category = await this.blogCategoryModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }
  async delete(id: string) {
    const result = await this.blogCategoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
    return 'deleted';
  }
}
