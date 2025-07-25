/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/utils/supabase";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const getDocumentsByCollections = async (collectionIds: string[]) => {
  const { data, error } = await supabase
    .from("document")
    .select("*")
    .in("collection_id", collectionIds)
    .order("title");

  if (error) throw error;
  return data;
};

export const useGetDocumentsByCollections = (collectionIds: string[]) => {
  const { data, error, mutate } = useSWR(collectionIds, (collectionIds) =>
    getDocumentsByCollections(collectionIds)
  );

  if (error) throw error;
  return { data, error, mutate };
};

const getDocumentById = async (Id: string) => {
  const { data, error } = await supabase
    .from("document")
    .select("*")
    .eq("id", Id)
    .single();

  if (error) throw error;
  return data;
};

export const useGetDocumentById = (Id: string) => {
  const { data, error, mutate } = useSWR(Id, (Id) => getDocumentById(Id));

  if (error) throw error;
  return { data, error, mutate };
};

const createDocument = async (_url: string, { arg }: { arg: any }) => {
  const { data, error } = await supabase
    .from("document")
    .insert(arg)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useCreateDocument = () => {
  const { trigger, isMutating } = useSWRMutation("document", createDocument);

  return { createDocument: trigger, isMutating };
};

const updateDocument = async (_url: string, { arg }: { arg: any }) => {
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };
  if (arg.title !== undefined && arg.title !== null) {
    updateData.title = arg.title;
  }
  if (arg.content !== undefined && arg.content !== null) {
    updateData.content = arg.content;
  }

  const { data, error } = await supabase
    .from("document")
    .update(updateData)
    .eq("id", arg.id)
    .select()
    .single();

  if (error) {
    console.log("Error updating document:", error);
    throw error;
  }

  console.log("Document updated successfully:", data);
  return data;
};

export const useUpdateDocument = () => {
  const { trigger, isMutating } = useSWRMutation("document", updateDocument);

  return { updateDocument: trigger, isMutating };
};
