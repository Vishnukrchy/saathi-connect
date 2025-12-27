import { formatDistanceToNow } from 'date-fns';
import { Bell, Calendar, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  related_booking_id: string | null;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'booking_confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'booking_cancelled':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'new_booking':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'booking_reminder':
        return <Bell className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={cn(
        'p-4 hover:bg-muted/50 cursor-pointer transition-colors',
        !notification.is_read && 'bg-primary/5'
      )}
      onClick={() => !notification.is_read && onMarkAsRead(notification.id)}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm',
            !notification.is_read && 'font-medium'
          )}>
            {notification.title}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
          </p>
        </div>
        {!notification.is_read && (
          <div className="flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
