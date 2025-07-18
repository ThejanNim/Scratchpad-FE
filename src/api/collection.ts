import { supabase } from "@/utils/supabase";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const getCollectionsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("collection")
    .select("*")
    .eq("user_id", userId)
    .order("name");

  if (error) throw error;
  return data;
};

export const useGetCollectionsByUser = (userId: string) => {
  const { data, error, mutate } = useSWR(
    [userId],
    getCollectionsByUser
  );

  return { data, error, mutate };
};

interface CreateCollectionData {
  collectionName: string;
  parentId: string | null;
  userId: string;
}

const createCollection = async (
  _url: string,
  { arg }: { arg: CreateCollectionData }
) => {
  const { data, error } = await supabase
    .from("collection")
    .insert({
      name: arg.collectionName,
      parent_id: arg.parentId,
      user_id: arg.userId,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

export const useCreateCollection = () => {
  const { trigger, isMutating } = useSWRMutation(
    "collections",
    createCollection
  );

  return { createCollection: trigger, isMutating };
};
