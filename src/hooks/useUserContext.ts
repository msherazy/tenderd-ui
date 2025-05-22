import { useContext } from 'react';

import { UserContext } from '@/context/user-context.ts';

export const useUserContext = () => {
  return useContext(UserContext);
};
