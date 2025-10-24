import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Goal } from '../../entities/goals/goal.entity';

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}

  async create(createGoalDto: CreateGoalDto, businessId: string) {
    const goal = this.goalRepository.create({
      ...createGoalDto,
      business: { id: businessId },
    });
    return this.goalRepository.save(goal);
  }

  findAllByBusiness(businessId: string) {
    return this.goalRepository.find({
      where: { business: { id: businessId } },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string, businessId: string) {
    const goal = await this.goalRepository.findOne({
      where: { id, business: { id: businessId } },
    });
    if (!goal) {
      throw new NotFoundException(
        `Goal with ID "${id}" not found or does not belong to your business.`,
      );
    }
    return goal;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto, businessId: string) {
    const goal = await this.findOne(id, businessId); // Reutiliza a verificação de posse
    const updatedGoal = this.goalRepository.merge(goal, updateGoalDto);
    return this.goalRepository.save(updatedGoal);
  }

  async remove(id: string, businessId: string) {
    const goal = await this.findOne(id, businessId); // Reutiliza a verificação de posse
    await this.goalRepository.remove(goal);
    return { message: `Goal with ID "${id}" successfully deleted.` };
  }
}
