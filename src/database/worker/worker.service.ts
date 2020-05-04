import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerEntity } from './worker.entity';

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(WorkerEntity)
        private readonly workerRepository: Repository<WorkerEntity>
    ) {}

    async save(workers: WorkerEntity[]): Promise<WorkerEntity[]> {
        return await this.workerRepository.save(workers);
    }

    async findAll(): Promise<WorkerEntity[]> {
        return await this.workerRepository.find();
    }
}
