import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryBlog } from 'src/db/entities/categoryBlog.entity';
import { Role } from 'src/db/entities/roles.entity';
import { Status } from 'src/db/entities/status.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(CategoryBlog)
    private categoryBlogRepository: Repository<CategoryBlog>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  // Метод для автоматического запуска сидов при старте приложения
  async onApplicationBootstrap() {
    await this.runSeed(); // Автоматический запуск сидов
  }

  // Метод для выполнения сидов
  async runSeed() {
    await this.categorySeed()

    const roles = [
      this.roleRepository.create({ id: 1, name: 'Admin' }),
      this.roleRepository.create({ id: 2, name: 'User' }),
    ];
    const statuses = [
      this.statusRepository.create({ id: 1, name: 'Under consideration' }),
      this.statusRepository.create({ id: 2, name: 'Accepted' }),
      this.statusRepository.create({ id: 3, name: 'Denied' }),
    ];
    
    await this.roleRepository.save(roles);
  }

  async categorySeed() {
    const categories = [
      this.categoryBlogRepository.create({ id: 1, name: 'Technology' }),
      this.categoryBlogRepository.create({ id: 2, name: 'Lifestyle' }),
      this.categoryBlogRepository.create({ id: 3, name: 'Education' }),
      this.categoryBlogRepository.create({ id: 4, name: 'Music' }),
      this.categoryBlogRepository.create({ id: 5, name: 'Scientific' }),
      this.categoryBlogRepository.create({ id: 6, name: 'Entertainment' }),
    ];
    await this.categoryBlogRepository.save(categories);
  }
}
