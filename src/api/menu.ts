// src/api/menu.ts
import { invoke } from "@tauri-apps/api/core";

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  return await invoke("get_all_menu");
};

export const addMenuItem = async (
  item: Omit<MenuItem, "id" | "created_at">
): Promise<number> => {
  return await invoke("create_menu_item", { item });
};
