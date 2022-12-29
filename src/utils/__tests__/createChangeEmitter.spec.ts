import { createChangeEmitter } from '../createChangeEmitter';
import { Emitter } from '../types';
import { NotificationProps } from '../../components/Notification/types';

let emitter: Emitter | null = null;

beforeEach(() => {
  emitter = createChangeEmitter();
});

afterEach(() => {
  emitter = null;
});

describe('Change Emitter', () => {
 it('should properly implement add/remove events', () => {
    if (!emitter) throw 'no emitter';

    const { listen, emit } = emitter;
    const increment = jest.fn();
    const decrement = jest.fn();

    listen((action) => {
      if (action === 'add') {
        return increment;
      } else {
        return decrement;
      }
    });

    emit('add')();
    emit('add')();
    emit('remove')();

    expect(increment).toBeCalledTimes(2);
    expect(decrement).toBeCalledTimes(1);
 });
 it('should use additional param passed in emit method', () => {
    if (!emitter) throw 'no emitter';

    const { listen, emit } = emitter;
    const notification: NotificationProps = { 
      type: 'success', 
      width: '450px', 
      content: 'Success Notification New', 
    };

    let result;

    listen((action) => (param) => {
      if (action === 'add') {
        result = param;
      }
    });

    emit('add')(notification);

    expect(result).toEqual(notification);
 });
});
