import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, desc } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.desc = desc;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    // Match the name of Query Builder with Entity.
    // For Complex Query at one line.
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      // Use Circle Parentheses refer many if statements to one condition.
      query.andWhere('(task.title LIKE :search OR task.desc LIKE :search)', {
        search: `%${search}%`,
      });
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
