import { NoteService } from "./core/note-service.js";
import { ReminderService } from "./core/reminder-service.js";
import { OpenAICompatibleProvider } from "./providers/llm.js";
import { ConsoleAdapter } from "./integrations/task-adapter.js";

async function main(): Promise<void> {
  const provider = new OpenAICompatibleProvider({
    name: "openai-compatible",
    baseUrl: process.env.LLM_BASE_URL ?? "https://api.openai.com",
    apiKey: process.env.LLM_API_KEY ?? ""
  });

  const noteService = new NoteService(provider);
  const reminderService = new ReminderService(new ConsoleAdapter());

  const notePath = process.argv[2];
  if (!notePath) {
    throw new Error("Provide a markdown file path as the first argument.");
  }

  const note = await noteService.open(notePath);
  const insights = await noteService.analyze(note);

  console.log("Summary:\n", insights.summary);
  console.log("Tags:", insights.tags.join(", "));
  console.log("Entities:", insights.entities.join(", "));
  console.log("Tasks detected:", insights.tasks.length);

  for (const task of insights.tasks) {
    const reminders = reminderService.buildDefaultReminders(task);
    await reminderService.publish(task, reminders);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
