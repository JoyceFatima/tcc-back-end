import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BusinessMetric } from '@/entities/business-metric/business-metric.entity';
import { Goal } from '@/entities/goals/goal.entity';

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    @InjectRepository(BusinessMetric)
    private readonly businessMetricRepository: Repository<BusinessMetric>,
  ) {}

  async create(createGoalDto: CreateGoalDto, businessId: string) {
    const goal = this.goalRepository.create({
      ...createGoalDto,
      business: { id: businessId },
    });

    if (goal.metricId) {
      await this.updateMetricFromGoal(goal);
    }

    return this.goalRepository.save(goal);
  }

  findAllByBusiness(businessId: string, isCompleted = false) {
    return this.goalRepository.find({
      where: { business: { id: businessId }, isCompleted },
      order: { createdAt: 'ASC' },
      relations: ['metric'],
    });
  }

  async findOne(id: string, businessId: string) {
    const goal = await this.goalRepository.findOne({
      where: { id, business: { id: businessId } },
      relations: ['metric'],
    });
    if (!goal) {
      throw new NotFoundException(
        `Goal with ID "${id}" not found or does not belong to your business.`,
      );
    }
    return goal;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto, businessId: string) {
    const goal = await this.findOne(id, businessId);
    const updatedGoal = this.goalRepository.merge(goal, updateGoalDto);

    if (updatedGoal.metricId) {
      await this.updateMetricFromGoal(updatedGoal);
    }

    return this.goalRepository.save(updatedGoal);
  }

  async remove(id: string, businessId: string) {
    const goal = await this.findOne(id, businessId);
    await this.goalRepository.remove(goal);
    return { message: `Goal with ID "${id}" successfully deleted.` };
  }

  async complete(id: string, businessId: string) {
    const goal = await this.findOne(id, businessId);
    goal.isCompleted = true;
    return this.goalRepository.save(goal);
  }

  private async updateMetricFromGoal(goal: Goal) {
    const metric = await this.businessMetricRepository.findOne({
      where: { id: goal.metricId },
    });

    if (metric) {
      const current = goal.current ?? 0;
      const target = goal.target ?? 0;
      const progress = target > 0 ? Math.round((current / target) * 100) : 0;
      metric.value = `${current}`;
      metric.change = `${progress}%`;
      await this.businessMetricRepository.save(metric);
    }
  }
}
