import { supabase } from "@/utils/supabase";
import useSWR from "swr";

const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
};

export const useGetUser = () => {
  const { data, error, mutate } = useSWR("user", getUser);

  return { data, error, mutate };
};
