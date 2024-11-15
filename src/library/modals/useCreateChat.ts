import { useModal } from './modal-wrapper/useModal';

export const useModalCreateChat = async (title) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateChat.vue'),
    attrs: {
      title, 
    },
  });
  console.log('data', data);
  return data;
}
