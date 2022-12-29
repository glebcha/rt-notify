import React from 'react';
import { NotificationsProps } from '../src/components/Notifications/types';
import { NotificationProps } from '../src/components/Notification/types';
import { Notifications, eventEmitter } from '../src/components/Notifications';

export default {
  title: 'Notifications',
  component: Notifications,
};

const defaultNotifications: Array<NotificationProps> = [
  { id: 1, type: 'success', content: 'Success Notification', width: '350px', timeout: null },
  { id: 2, type: 'error', content: 'Error Notification', width: '350px', timeout: null },
];

const { log } = console;

const handler = (index: number): void => {
  const addNotification = eventEmitter.emit('add');
  const types: Array<NotificationProps> = [
    { 
      type: 'waiting', 
      content: 'Waiting Notification New', 
      width: '350px', 
      onClose: (): void => log('CLOSED WAITING NOTIFICATION') 
    },
    { 
      type: 'success', 
      width: '350px', 
      content: 'Success Notification New', 
    },
    { 
      type: 'error', 
      width: '350px', 
      content: 'Error Notification New' 
    },
  ];

  addNotification(types[index]);
};

export const BasicNotifications = (args: NotificationsProps & { showDuplicate: boolean }) => (
  <React.Fragment>
    <Notifications {...args} />
    {
      args.showDuplicate ? 
      <Notifications 
        {...args}  
        duplicatePlaceholder={
          <h3 style={{textAlign: 'center'}}>
            Duplicate Notifications Container
          </h3>
        } 
      /> : null
    }
    <div style={{ display: 'flex', flexFlow: 'column', width: '100px', gap: '10px' }}>
      <button onClick={handler.bind(null, 0)}>Add Waiting Notification</button>
      <button onClick={handler.bind(null, 1)}>Add Success Notification</button>
      <button onClick={handler.bind(null, 2)}>Add Error Notification</button>
    </div>
  </React.Fragment>
);

BasicNotifications.args = {
  defaultTimeout: 3000,
  animationTimeout: 500,
  animation: 'fade',
  placement: 'right',
  notifications: defaultNotifications,
  showDuplicate: false,
};

BasicNotifications.parameters = {
  controls:{
    exclude:/duplicatePlaceholder|notifications/g
  }
};
