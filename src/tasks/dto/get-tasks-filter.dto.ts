import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  // It is OK when the query status is not, but if query exists, status must be in TaskStatus.
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  // It is OK when the query search is not, but if query exists, search must not be empty.
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
