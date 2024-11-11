import { useModal } from './modal-wrapper/useModal';

export const useSelectUser2 = async (title, users) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./SelectUser2.vue'),
    attrs: {
      title, 
      users,
    },
  });
  console.log('data', data);
  return data;
}
