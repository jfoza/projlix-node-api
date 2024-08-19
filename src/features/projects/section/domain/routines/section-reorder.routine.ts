import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SectionReorderRoutine {
  private sectionId: string;
  private projectId: string;
  private newOrder: number;

  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    await this.dataSource.query('SELECT project.reorder_sections($1, $2, $3)', [
      this.getSectionId(),
      this.getNewOrder(),
      this.getProjectId(),
    ]);
  }

  setSectionId(value: string): this {
    this.sectionId = value;
    return this;
  }

  setProjectId(value: string): this {
    this.projectId = value;
    return this;
  }

  setNewOrder(value: number): this {
    this.newOrder = value;
    return this;
  }

  getSectionId(): string {
    return this.sectionId;
  }

  getProjectId(): string {
    return this.projectId;
  }

  getNewOrder(): number {
    return this.newOrder;
  }
}
