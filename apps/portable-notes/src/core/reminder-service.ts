import { ExtractedTask, Reminder } from "./models.js";
import { ExternalTaskAdapter } from "../integrations/task-adapter.js";

export class ReminderService {
  constructor(private readonly adapter: ExternalTaskAdapter) {}

  buildDefaultReminders(task: ExtractedTask): Reminder[] {
    if (!task.dueDateIso) return [];
    const due = new Date(task.dueDateIso).getTime();
    const offsets = [24 * 60 * 60 * 1000, 2 * 60 * 60 * 1000, 0];
    return offsets.map((offset) => ({
      id: `${task.id}-${offset}`,
      taskId: task.id,
      triggerAtIso: new Date(due - offset).toISOString(),
      channel: "app",
      state: "pending"
    }));
  }

  async publish(task: ExtractedTask, reminders: Reminder[]): Promise<void> {
    const externalId = await this.adapter.upsertTask(task);
    await Promise.all(
      reminders.map((reminder) =>
        this.adapter.createReminder({ ...task, id: externalId }, reminder)
      )
    );
  }
}
