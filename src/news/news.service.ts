import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const news = this.newsRepository.create(createNewsDto);
    return await this.newsRepository.save(news);
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException('News not found');
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.newsRepository.preload({
      id,
      ...updateNewsDto,
    });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    return this.newsRepository.save(news);
  }

  async remove(id: number) {
    return await this.newsRepository.delete({ id });
  }
}
