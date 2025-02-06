import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the type for each setting option
interface SettingOption {
  href: string; // The link URL
  icon: LucideIcon; // Icon component from lucide-react
  label: string; // Button label
  className?: string; // Optional additional class names
}

// Props type for the component
interface SettingsSidebarProps {
  settingsOptions: SettingOption[]; // Array of settings options
}

export function SettingsSidebar({ settingsOptions }: SettingsSidebarProps) {
  return (
    <div className="p-4">
      <div className="space-y-2">
        {settingsOptions.map(({ href, icon: Icon, label, className }) => (
          <Button
            key={href}
            variant="ghost"
            className={`w-full justify-start ${className || ""}`}
            asChild
          >
            <Link href={href}>
            {Icon && <Icon className="mr-2 h-4 w-4" />}
              {label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
