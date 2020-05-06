import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WorkerEntity } from './worker.entity';
import { WorkerService } from './worker.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FrontStucture } from '../../adapter/frontStucture';
import { Company } from '../../adapter/Company';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

ApiTags('worker');
// @ApiBearerAuth('JWT')
// @UseGuards(JwtAuthGuard)
@Controller('worker')
export class WorkerController {
    constructor(private readonly workerService: WorkerService) {}

    @Get()
    async findAll(): Promise<WorkerEntity[]> {
        return this.workerService.findAll();
    }

    @Get('structure')
    async getStructuredData(): Promise<Company[]> {
        const workers = await this.workerService.findAll();
        const companies = new FrontStucture();
        companies.addPeople(workers);

        const result = companies.getCompanies();

        return result;
    }

    @Post()
    @ApiBody({ type: WorkerEntity, isArray: true })
    async save(@Body() body: WorkerEntity[]): Promise<WorkerEntity[]> {
        return this.workerService.save(body);
    }
}
