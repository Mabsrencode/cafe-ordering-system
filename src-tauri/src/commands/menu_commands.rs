use tauri::State;
use sqlx::SqlitePool;
use crate::models::menu::MenuItem;
use crate::services::menu_service::{get_all, insert_item};

#[tauri::command]
pub async fn get_all_menu(db: State<'_, SqlitePool>) -> Result<Vec<MenuItem>, String> {
    get_all(&db).await
}

#[tauri::command]
pub async fn add_menu_item(db: State<'_, SqlitePool>, item: MenuItem) -> Result<(), String> {
    insert_item(&db, item).await
}
