import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const triggers = [
  {
    title: "Leave Application",
    description:
      "Runs the flow on clicking a button in n8n. Good for getting started quickly",
    icon: "▶️",
  },
  {
    title: "Shift Change Application",
    description:
      "Runs the flow when something happens in an app like Telegram, Notion or Airtable",
    icon: "📡",
  },
  {
    title: "Punch Regularization Application",
    description: "Runs the flow every day, hour, or custom interval",
    icon: "⏰",
  }
];

interface SidebarProps {
  onAddNode: (type: string) => void
}

export default function WorkflowTrigger({ onAddNode }: SidebarProps) {
  return (
    <div className="w-full relative pt-[117px] px-4 pb-0">
      <div className="bg-white text-[#344767] space-y-4 p-6 flex flex-col rounded-2xl shadow-lg h-full">
        {/* Header and Search */}
        <div className="space-y-4">
          <div>
            <h6 className="text-xl font-semibold">What triggers this workflow?</h6>
            <p className="text-[#7b809a] text-base">
              A trigger is a step that starts your workflow
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search nodes..."
              className="pl-9 bg-white border-[#7b809a] text-white placeholder:text-[#7b809a]"
            />
          </div>
        </div>

        {/* Trigger List (Scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1">
          {triggers.map((trigger) => (
            <Button
              key={trigger.title}
              variant="ghost"
              onClick={()=>onAddNode("start-flow")}
              className="group w-full justify-start text-left h-auto py-3 px-4 rounded-md 
                     hover:bg-gradient-to-b hover:from-[#3f3f46] hover:to-[#1b1b1b] 
                     hover:backdrop-blur-lg hover:shadow-lg hover:text-white"
            >
              <div className="flex gap-3 items-start max-w-full">
                <div className="text-xl flex-shrink-0 mt-0.5">{trigger.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold">
                    {trigger.title}
                  </div>
                  <div className="text-sm text-[#7b809a] break-words whitespace-normal group-hover:text-[#babcc9]">
                    {trigger.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

