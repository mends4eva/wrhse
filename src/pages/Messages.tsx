import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Paperclip, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  hasAttachment: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'MGR001',
    fromName: 'James Mitchell',
    subject: 'Monthly Audit Report Due',
    preview: 'Please ensure all turnaround entries are submitted by end of day...',
    timestamp: '2024-01-14 14:30',
    read: false,
    hasAttachment: true,
  },
  {
    id: '2',
    from: 'SUP001',
    fromName: 'Marcus Rodriguez',
    subject: 'Schedule Update',
    preview: 'Updated schedule for next week has been posted...',
    timestamp: '2024-01-14 11:15',
    read: true,
    hasAttachment: false,
  },
  {
    id: '3',
    from: 'WRK002',
    fromName: 'Lisa Anderson',
    subject: 'Picklist Question',
    preview: 'Need clarification on item quantities for PL-2024-0157...',
    timestamp: '2024-01-14 09:45',
    read: true,
    hasAttachment: false,
  },
];

export const Messages: React.FC = () => {
  const { user } = useAuth();
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const [showCompose, setShowCompose] = useState(false);

  return (
    <PageLayout title="Messages" subtitle="Team communication hub">
      <div className="space-y-6">
        {/* Message Stats - Mobile first */}
        <div className="grid grid-cols-3 gap-3 md:hidden">
          <Card className="liquid-glass-sm p-3 border-white/10 text-center">
            <p className="text-xs text-gray-500 font-mono mb-1">Unread</p>
            <p className="text-xl font-display font-bold text-wms-amber">1</p>
          </Card>
          <Card className="liquid-glass-sm p-3 border-white/10 text-center">
            <p className="text-xs text-gray-500 font-mono mb-1">Total</p>
            <p className="text-xl font-display font-bold text-wms-cyan">3</p>
          </Card>
          <Card className="liquid-glass-sm p-3 border-white/10 text-center">
            <p className="text-xs text-gray-500 font-mono mb-1">Today</p>
            <p className="text-xl font-display font-bold text-wms-green">2</p>
          </Card>
        </div>

        {/* Compose Button */}
        <Button
          onClick={() => setShowCompose(!showCompose)}
          className="w-full py-6 bg-gradient-to-r from-wms-cyan/30 to-wms-cyan/20 hover:from-wms-cyan/40 hover:to-wms-cyan/30 text-wms-cyan border border-wms-cyan/30 font-mono font-semibold transition-all"
        >
          <Send className="w-5 h-5 mr-2" />
          New Message
        </Button>

        {/* Compose Form */}
        {showCompose && (
          <Card className="liquid-glass p-6 md:p-8 border-white/15">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">New Message</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 font-mono text-xs md:text-sm mb-2 block uppercase tracking-wide">Recipient</label>
                <Input
                  placeholder="User ID (e.g., MGR001)"
                  className="bg-white/5 border-white/10 text-white font-mono placeholder:text-gray-600 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-gray-300 font-mono text-xs md:text-sm mb-2 block uppercase tracking-wide">Subject</label>
                <Input
                  placeholder="Message subject"
                  className="bg-white/5 border-white/10 text-white font-mono placeholder:text-gray-600 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-gray-300 font-mono text-xs md:text-sm mb-2 block uppercase tracking-wide">Message</label>
                <Textarea
                  placeholder="Type your message..."
                  rows={5}
                  className="bg-white/5 border-white/10 text-white font-mono resize-none placeholder:text-gray-600 text-sm md:text-base"
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 py-6 bg-wms-cyan/20 hover:bg-wms-cyan/30 text-wms-cyan border border-wms-cyan/30 font-mono font-semibold">
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCompose(false)}
                  className="flex-1 py-6 border-white/20 font-mono font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Messages List */}
        <Card className="liquid-glass p-6 md:p-8 border-white/15">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">Inbox</h3>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 md:p-6 rounded-xl liquid-glass-sm cursor-pointer transition-all duration-200 border ${
                  message.read
                    ? 'border-white/10 hover:border-white/20'
                    : 'border-wms-cyan/30 bg-wms-cyan/5 hover:border-wms-cyan/50'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-wms-cyan/30 to-wms-green/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 md:w-6 md:h-6 text-wms-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-sm md:text-base font-semibold text-white">{message.fromName}</p>
                        <p className="font-mono text-xs text-gray-500">{message.from}</p>
                      </div>
                      {!message.read && (
                        <div className="w-2 h-2 rounded-full bg-wms-cyan mt-2 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="font-mono text-sm md:text-base font-semibold text-white mb-2">{message.subject}</p>
                <p className="text-gray-400 text-xs md:text-sm font-mono line-clamp-2 mb-3">{message.preview}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-mono">{message.timestamp}</span>
                  {message.hasAttachment && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                      <Paperclip className="w-3 h-3" />
                      Attachment
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};
