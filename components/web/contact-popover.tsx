"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="" size="lg">
          Contact me
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 space-y-3">
        <a
          href="https://wa.me/2349022517371"
          target="_blank"
          className="flex items-center gap-3 rounded-md border p-3 hover:bg-accent"
        >
          <MessageCircle className="h-5 w-5" />
          <div>
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-xs text-muted-foreground">Fastest response</p>
          </div>
        </a>

        <a
          href="mailto:ochifeoge@gmail.com"
          className="flex items-center gap-3 rounded-md border p-3 hover:bg-accent"
        >
          <Mail className="h-5 w-5" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-muted-foreground">
              For detailed enquiries
            </p>
          </div>
        </a>
      </PopoverContent>
    </Popover>
  );
}
