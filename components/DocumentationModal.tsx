"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface DocumentationModalProps {
  title: string;
  content: string;
  children: React.ReactNode;
}

export default function DocumentationModal({ title, content, children }: DocumentationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-900 border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-bold text-white">{title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: content
                  .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-blue-400 mb-3 mt-5">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-blue-300 mb-2 mt-4">$1</h3>')
                  .replace(/^#### (.*$)/gim, '<h4 class="text-base font-semibold text-gray-200 mb-2 mt-3">$1</h4>')
                  .replace(/^\* (.*$)/gim, '<li class="text-gray-300 mb-1">$1</li>')
                  .replace(/^- (.*$)/gim, '<li class="text-gray-300 mb-1">$1</li>')
                  .replace(/```([^`]+)```/gim, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400">$1</code></pre>')
                  .replace(/`([^`]+)`/gim, '<code class="bg-gray-800 px-2 py-1 rounded text-green-400">$1</code>')
                  .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>')
                  .replace(/\*(.*?)\*/gim, '<em class="text-gray-200">$1</em>')
                  .replace(/\n\n/gim, '</p><p class="mb-4">')
                  .replace(/^(?!<[h|l|p|d|s|c])(.*$)/gim, '<p class="mb-4">$1</p>')
              }}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

