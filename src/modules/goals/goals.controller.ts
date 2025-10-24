import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'; // Supondo que você tenha um AuthGuard

import { AuthGuard } from '../../guards/auth.guard';

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';

@UseGuards(AuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  // Cria uma nova meta para o negócio do usuário logado
  @Post()
  create(@Body() createGoalDto: CreateGoalDto, @Req() req) {
    const businessId = req.user.businessId; // Supondo que o ID do negócio está no token
    return this.goalsService.create(createGoalDto, businessId);
  }

  // Busca todas as metas do negócio do usuário logado
  @Get()
  findAll(@Req() req) {
    const businessId = req.user.businessId;
    return this.goalsService.findAllByBusiness(businessId);
  }

  // Busca uma meta específica
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const businessId = req.user.businessId;
    return this.goalsService.findOne(id, businessId);
  }

  // Atualiza uma meta
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @Req() req,
  ) {
    const businessId = req.user.businessId;
    return this.goalsService.update(id, updateGoalDto, businessId);
  }

  // Remove uma meta
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const businessId = req.user.businessId;
    return this.goalsService.remove(id, businessId);
  }
}
