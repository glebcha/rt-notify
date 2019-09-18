import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, button, select, boolean, number } from '@storybook/addon-knobs'
import { Notifications, eventEmitter } from '../src/components/Notifications'

const Duplicate = (props: { show: boolean }) => props.show &&  
  <Notifications 
    notifications={defaultNotifications} 
    duplicatePlaceholder={<h3 style={{textAlign: 'center'}}>Duplicate Notifications Container</h3>}
  />

const defaultNotifications = [
  { id: 1, type: 'success', content: 'Success Notification', timeout: null },
  { id: 2, type: 'error', content: 'Error Notification', timeout: null },
]

const placementLabel = 'Placement'
const options = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}
const defaultValue = 'right'

const handler = (index: number) => {
  const types = [
    { 
      type: 'waiting', 
      content: 'Waiting Notification New', 
      width: '600px', 
      onClose: () => console.log('CLOSED WAITING NOTIFICATION') 
    },
    { 
      type: 'success', 
      width: '450px', 
      content: 'Success Notification New', 
    },
    { 
      type: 'error', 
      width: '300px', 
      content: 'Error Notification New' 
    },
  ]

  eventEmitter.emit('add', types[index])
}

const stories = storiesOf('Notifications', module)
stories.addDecorator(withKnobs)

stories.add('default', () => {
  return (<React.Fragment>
    <Notifications 
      defaultTimeout={number('Default timeout', 3000)}
      placement={ select(placementLabel, options, defaultValue) } 
      notifications={defaultNotifications} 
    />
    {button('Add Waiting', handler.bind(null, 0))}
    {button('Add Success', handler.bind(null, 1))}
    {button('Add Warning', handler.bind(null, 2))}
    <Duplicate show={boolean('Duplicate Notifications', false)} />
  </React.Fragment>);
})
