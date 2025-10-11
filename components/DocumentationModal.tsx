"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DocumentationModalProps {
  title: string;
  content: string;
  children: React.ReactNode;
}

function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-blue-400 mb-3 mt-5">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-blue-300 mb-2 mt-4">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-base font-semibold text-gray-200 mb-2 mt-3">$1</h4>')
    .replace(/^\* (.*)$/gim, '<li class="text-gray-300 mb-1 list-disc ml-6">$1</li>')
    .replace(/^- (.*)$/gim, '<li class="text-gray-300 mb-1 list-disc ml-6">$1</li>')
    .replace(/```([^`]+)```/gim, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 text-sm"><code class="text-green-400">$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code class="bg-gray-800 px-2 py-1 rounded text-green-400">$1</code>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="text-gray-200">$1</em>')
    .replace(/\n\n/gim, '</p><p class="mb-4">')
    .replace(/^(?!<[h|l|p|d|s|c])(.*$)/gim, '<p class="mb-4">$1</p>');
}

export default function DocumentationModal({ title, content, children }: DocumentationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formattedContent = formatContent(content);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[95vh] w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] bg-gray-900 border-gray-700 overflow-hidden m-2">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700">
          <DialogTitle className="text-lg sm:text-xl font-bold text-white pr-4 truncate">{title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-1 pr-2 sm:pr-4 overflow-y-auto scrollbar-thin" style={{ height: 'calc(95vh - 120px)' }}>
          <div className="prose prose-invert max-w-none py-4 modal-content-wrapper">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

