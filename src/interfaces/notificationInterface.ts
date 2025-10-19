type NotificationType = "Courses" | "Messages" | "System" | "Unread";

import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

export interface AppNotification {
  icon: ComponentType<LucideProps>;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: NotificationType;
}
