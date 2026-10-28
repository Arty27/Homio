import { useAuth } from "@clerk/expo";
import { useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";

export function useSavedProperty(propertyId: string, onUnsave?: () => void) {
  const { userId } = useAuth();
  const authSupabase = useSupabase();
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [propertyId, userId]);

  const checkIfSaved = async () => {
    if (!userId) return;

    try {
      const { data, error } = await authSupabase
        .from("saved_properties")
        .select("id")
        .eq("user_clerk_id", userId)
        .eq("property_id", propertyId)
        .limit(1);

      if (error) {
        console.error("Error checking saved property: ", error.message);
        setIsSaved(false);
        return;
      }
      setIsSaved(data.length > 0);
    } catch (error) {
      console.error("Unexpected error checking saved property:", error);
      setIsSaved(false);
    }
  };

  const toggleSave = async () => {
    if (!userId || saveLoading) return;
    setSaveLoading(true);
    try {
      if (isSaved) {
        const { error } = await authSupabase
          .from("saved_properties")
          .delete()
          .eq("user_clerk_id", userId)
          .eq("property_id", propertyId);

        if (error) {
          console.error("Error unsaving property:", error.message);
          return;
        }
        setIsSaved(false);
        onUnsave?.();
      } else {
        const { error } = await authSupabase
          .from("saved_properties")
          .insert({ user_clerk_id: userId, property_id: propertyId });
        if (error) {
          console.error("Error saving property:", error.message);
          return;
        }
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Unexpected error toggling saved property:", error);
    } finally {
      setSaveLoading(false);
    }
  };
  return { isSaved, saveLoading, toggleSave };
}
