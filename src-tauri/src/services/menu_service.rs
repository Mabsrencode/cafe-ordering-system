use crate::db::menu_repo;
use crate::models::menu::MenuItem;
use sqlx::SqlitePool;
use crate::utils::error::AppError;

pub async fn get_all_menu_items(db: &SqlitePool) -> Result<Vec<MenuItem>, AppError> {
    menu_repo::fetch_all_menu_items(db)
        .await
        .map_err(|e| AppError::DatabaseError(e.to_string()))
}

pub async fn add_menu_item(db: &SqlitePool, item: MenuItem) -> Result<i64, AppError> {
    menu_repo::insert_menu_item(db, item)
        .await
        .map_err(|e| AppError::DatabaseError(e.to_string()))
}