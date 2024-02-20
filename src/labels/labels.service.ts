import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Labels } from './labels.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { GetLabelFilterDto } from './dto/get-labels-filter.dto';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Labels)
    private labelRepository: Repository<Labels>,
  ) {}

  async getLabels(filterDto: GetLabelFilterDto, user: User) {
    const { fieldName } = filterDto;
    const labelsQuery = this.labelRepository.createQueryBuilder('labels');

    labelsQuery.where('labels.userId= :userId', { userId: user.id });

    if (fieldName) {
      labelsQuery.andWhere('labels.labelName LIKE :fieldName', {
        fieldName: `%${fieldName}%`,
      });
    }

    const labels = await labelsQuery.getMany();

    if (!labels) {
      throw new NotFoundException('No labels found!');
    }

    return labels;
  }

  async getLabelById(id: string, user: User) {
    const labelFound = await this.labelRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!labelFound) {
      throw new NotFoundException(`Label with ID:${id} not found`);
    }

    return labelFound;
  }

  async createLabel(createLabelDto: CreateLabelDto, user: User) {
    const { labelName, labelColor } = createLabelDto;
    const newLabel = { labelName, labelColor, user };

    const savedLabel = await this.labelRepository.save(newLabel);

    return savedLabel;
  }

  async updateLabel(id: string, createLabelDto: CreateLabelDto, user: User) {
    await this.getLabelById(id, user);
    const { labelName, labelColor } = createLabelDto;
    await this.labelRepository.update(id, {
      labelName,
      labelColor,
    });
  }
}
