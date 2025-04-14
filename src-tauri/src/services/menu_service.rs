use sqlx::SqlitePool;
use crate::models::menu::MenuItem;
use crate::db::menu_repo;

pub async fn get_all(db: &SqlitePool) -> Result<Vec<MenuItem>, String> {
    menu_repo::fetch_all_menu_items(db).await
}

pub async fn insert_item(db: &SqlitePool, item: MenuItem) -> Result<(), String> {
    menu_repo::insert_menu_item(db, item).await
}
