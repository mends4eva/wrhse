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
    <PageLayout title="Messages" subtitle="Cross-role communication and notifications">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2">
          <Card className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-white">Inbox</h3>
              <Button
                onClick={() => setShowCompose(!showCompose)}
                className="bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-mono"
              >
                <Send className="w-4 h-4 mr-2" />
                Compose
              </Button>
            </div>

            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                    message.read
                      ? 'bg-wms-bg/20 border-white/5 hover:bg-wms-bg/40'
                      : 'bg-wms-cyan/10 border-wms-cyan/30 hover:bg-wms-cyan/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-wms-cyan/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-wms-cyan" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-semibold text-white">{message.fromName}</p>
                        <p className="font-mono text-xs text-gray-400">{message.from}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {message.hasAttachment && (
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-xs font-mono text-gray-500">{message.timestamp}</span>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-semibold text-white mb-1">{message.subject}</p>
                  <p className="font-mono text-xs text-gray-400 line-clamp-1">{message.preview}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Compose / Info Panel */}
        <div>
          {showCompose ? (
            <Card className="glass-panel p-6">
              <h3 className="font-display text-xl font-bold text-white mb-4">New Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 font-mono text-sm mb-2 block">To</label>
                  <Input
                    placeholder="User ID (e.g., MGR001)"
                    className="bg-wms-bg/50 border-white/20 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-mono text-sm mb-2 block">Subject</label>
                  <Input
                    placeholder="Message subject"
                    className="bg-wms-bg/50 border-white/20 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-mono text-sm mb-2 block">Message</label>
                  <Textarea
                    placeholder="Type your message..."
                    rows={6}
                    className="bg-wms-bg/50 border-white/20 text-white font-mono resize-none"
                  />
                </div>
                <Button className="w-full bg-wms-cyan hover:bg-wms-cyan/90 text-wms-bg font-mono">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="glass-panel p-6">
              <h3 className="font-display text-xl font-bold text-white mb-4">Message Stats</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-wms-bg/30">
                  <p className="text-gray-400 text-xs font-mono mb-1">Unread</p>
                  <p className="text-2xl font-display font-bold text-wms-amber">1</p>
                </div>
                <div className="p-4 rounded-lg bg-wms-bg/30">
                  <p className="text-gray-400 text-xs font-mono mb-1">Total Messages</p>
                  <p className="text-2xl font-display font-bold text-wms-cyan">3</p>
                </div>
                <div className="p-4 rounded-lg bg-wms-bg/30">
                  <p className="text-gray-400 text-xs font-mono mb-1">Sent Today</p>
                  <p className="text-2xl font-display font-bold text-wms-green">2</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
