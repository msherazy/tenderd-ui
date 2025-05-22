import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AuthApi } from '@/api';
import { useUserContext } from '@/hooks/useUserContext';

interface UserInfoResponse {
  data: {
    name: string;
    email: string;
  };
  success: boolean;
}

export const useGetUserInfo = () => {
  const { updateUserData } = useUserContext();
  const token = localStorage.getItem('token') ?? '';

  const { data, error, isLoading } = useQuery<UserInfoResponse, Error>({
    queryKey: ['get-profile', token],
    queryFn: () => AuthApi.getUserInfo(token),
    enabled: !!token,
  });

  useEffect(() => {
    if (!data || !data.success) return;
    if (data?.data) {
      const { name, email } = data.data;
      updateUserData({ name, email });
    }
  }, [data]);

  return { data: data?.data, error, isLoading, success: data?.success };
};
