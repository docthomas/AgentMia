import { ExtractedTask, Reminder } from "../core/models.js";

export interface ExternalTaskAdapter {
  name: string;
  upsertTask(task: ExtractedTask): Promise<string>;
  createReminder(task: ExtractedTask, reminder: Reminder): Promise<void>;
}

export class ConsoleAdapter implements ExternalTaskAdapter {
  name = "console";

  async upsertTask(task: ExtractedTask): Promise<string> {
    console.log(`[console] upsert task: ${task.title}`);
    return task.id;
  }

  async createReminder(task: ExtractedTask, reminder: Reminder): Promise<void> {
    console.log(`[console] reminder ${reminder.triggerAtIso} for task ${task.title}`);
  }
}
