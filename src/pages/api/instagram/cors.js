import scheduleTasks from "@/utils/autoupdater";

export default async function handler(req, res) {
  // Initialize the cron job
  scheduleTasks();
  res.status(200).json({ message: "Cron job initialized" });
}
