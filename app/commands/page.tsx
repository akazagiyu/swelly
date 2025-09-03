import CommandSearch, { Command } from "@/components/CommandSearch";
import PageHeader from "@/components/layout/PageHeader";
import { getAllCommands } from "@/lib/commands";

export const metadata = { title: "Commands" };

export default async function CommandsPage() {
  const commands: Command[] = getAllCommands();
  return (
    <>
      <PageHeader title="Commands" subtitle="Search and filter Swelly commands. Click a command to see example usage." />
      <div className="container py-8">
        <CommandSearch commands={commands} />
      </div>
    </>
  );
}
