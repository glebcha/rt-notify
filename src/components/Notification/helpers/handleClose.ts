import { Props } from '../types';

export function handleClose(props: Props): () => void {
  return (): void => {
    const { id, remove, onClose } = props;

    remove(String(id));
    onClose && onClose();
  };
}
