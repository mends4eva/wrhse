import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'urgent';
  priority?: 'high' | 'medium' | 'low';
  time?: string;
  assignee?: string;
}

interface TaskCardProps {
  title?: string;
  tasks: TaskItem[];
  onTaskClick?: (taskId: string) => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        icon: CheckCircle,
        color: 'text-wms-green',
        bg: 'bg-wms-green/10',
        label: 'Completed',
      };
    case 'urgent':
      return {
        icon: AlertCircle,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        label: 'Urgent',
      };
    default:
      return {
        icon: Clock,
        color: 'text-wms-amber',
        bg: 'bg-wms-amber/10',
        label: 'Pending',
      };
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ title = "Tasks", tasks, onTaskClick }) => {
  return (
    <Card className="liquid-glass p-6 md:p-8 border-white/15">
      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">{title}</h3>
      
      <div className="space-y-3">
        {tasks.map((task) => {
          const statusConfig = getStatusConfig(task.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div 
              key={task.id}
              onClick={() => onTaskClick?.(task.id)}
              className="group p-4 rounded-lg liquid-glass-sm border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${statusConfig.bg} flex-shrink-0 mt-0.5`}>
                  <StatusIcon className={`w-4 h-4 md:w-5 md:h-5 ${statusConfig.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-gray-300 text-sm md:text-base font-mono font-semibold truncate">
                      {task.title}
                    </p>
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded whitespace-nowrap ${statusConfig.bg} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {task.time && (
                      <p className="text-xs text-gray-500 font-mono">{task.time}</p>
                    )}
                    {task.assignee && (
                      <p className="text-xs text-gray-500 font-mono">by {task.assignee}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
