use tauri::State;
use crate::{
    models::menu::MenuItem, 
    services::menu_service::{get_all_menu_items, add_menu_item},
    utils::error::AppError
};

#[tauri::command]
pub async fn get_all_menu(db: State<'_, sqlx::SqlitePool>) -> Result<Vec<MenuItem>, AppError> {
    get_all_menu_items(&db).await
}

#[tauri::command]
pub async fn create_menu_item(
    db: State<'_, sqlx::SqlitePool>, 
    item: MenuItem
) -> Result<i64, AppError> {
    add_menu_item(&db, item).await
}