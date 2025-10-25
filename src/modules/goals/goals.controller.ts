import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../guards/auth.guard';

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';

@UseGuards(AuthGuard)
@Controller('business/:businessId/goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  // Cria uma nova meta para o negócio do usuário logado
  @Post()
  create(
    @Param('businessId') businessId: string,
    @Body() createGoalDto: CreateGoalDto,
  ) {
    return this.goalsService.create(createGoalDto, businessId);
  }

  // Busca todas as metas do negócio do usuário logado
  @Get()
  findAll(
    @Param('businessId') businessId: string,
    @Query('completed') completed: string,
  ) {
    const isCompleted = completed === 'true';
    return this.goalsService.findAllByBusiness(businessId, isCompleted);
  }

  // Busca uma meta específica
  @Get(':id')
  findOne(@Param('id') id: string, @Param('businessId') businessId: string) {
    return this.goalsService.findOne(id, businessId);
  }

  // Atualiza uma meta
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @Param('businessId') businessId: string,
  ) {
    return this.goalsService.update(id, updateGoalDto, businessId);
  }

  // Remove uma meta
  @Delete(':id')
  remove(@Param('id') id: string, @Param('businessId') businessId: string) {
    return this.goalsService.remove(id, businessId);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string, @Param('businessId') businessId: string) {
    return this.goalsService.complete(id, businessId);
  }
}
