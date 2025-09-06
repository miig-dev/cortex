'use client';

import { InboxCapture } from '@/features/inbox/components/inbox-capture';
import { useState } from 'react';

interface InboxItem {
  id: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

export default function InboxPage() {
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([]);

  const handleItemAdded = (item: InboxItem) => {
    setInboxItems(prev => [item, ...prev]);
  };

  return (
    <InboxCapture
      onItemAdded={handleItemAdded}
      pendingCount={inboxItems.length}
    />
  );
}
