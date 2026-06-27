import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generalQueryDto } from 'src/shared/dtos/query-dto';
import { functionSort } from 'src/shared/utils/sort';
import { Blog } from '../schemas/blog.schema';
import { BlogDtos } from '../dtos/blog.dtos';
import { deleteImage } from 'src/shared/utils/image';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: generalQueryDto) {
    console.log('Servive');

    const { page = 1, title, limit = 5, sort } = queryParams;

    const sortObject = functionSort(sort);
    const filter = title ? { title: { $regex: title, $options: `i` } } : {};

    const blogs = await this.blogModel
      .find(filter)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .populate(`category`, { title: 1 })
      .select({ __v: 0 })
      .limit(limit)
      .exec();
    const count = await this.blogModel.countDocuments(filter);
    return { page, count, blogs };
  }
  async findOne(id: string) {
    const blog = await this.blogModel
      .findOne({ _id: id })
      .select({ __v: 0 })
      .populate(`category`, { title: 1 })
      .exec();
    if (blog) {
      return blog;
    } else {
      throw new NotFoundException();
    }
  }
  async create(body: BlogDtos) {
    const newBlog = new this.blogModel(body);
    await newBlog.save();
    return newBlog;
  }
  async update(id: string, body: BlogDtos) {
    const blog = await this.findOne(id);
    blog.content = body.content;
    blog.title = body.title;
    await blog.save();
    return blog;
  }
  async delete(id: string) {
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException();
    }
    await deleteImage(blog.image, 'blog');
    await blog.deleteOne();

    return 'deleted';
  }
}
