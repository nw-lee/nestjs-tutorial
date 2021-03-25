import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, desc } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.desc = desc;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    // Match the name of Query Builder with Entity.
    // For Complex Query at one line.
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

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
