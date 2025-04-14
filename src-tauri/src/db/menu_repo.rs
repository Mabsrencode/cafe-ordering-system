use sqlx::{SqlitePool, Row,query};
use crate::models::menu::MenuItem;

pub async fn fetch_all_menu_items(db: &SqlitePool) -> Result<Vec<MenuItem>, String> {
    let rows = sqlx::query("SELECT * FROM menu")
        .fetch_all(db)
        .await
        .map_err(|e| e.to_string())?;

    let items = rows
        .into_iter()
        .map(|row| MenuItem {
            id: row.try_get("id").ok(),
            name: row.try_get("name").unwrap_or_default(),
            description: row.try_get("description").unwrap_or_default(),
            price_hot: row.try_get("price_hot").unwrap_or(0.0),
            price_cold: row.try_get("price_cold").unwrap_or(0.0),
            category: row.try_get("category").unwrap_or_default(),
            image_url: row.try_get("image_url").unwrap_or_default(),
            available: row.try_get::<i64, _>("available").unwrap_or(1) != 0,
            created_at: row.try_get("created_at").ok(),
        })
        .collect();

    Ok(items)
}


pub async fn insert_menu_item(db: &SqlitePool, item: MenuItem) -> Result<(), String> {
    query(
        "INSERT INTO menu (
            name,
            description,
            price_hot,
            price_cold,
            category,
            image_url,
            available,
            created_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, CURRENT_TIMESTAMP)"
    )
    .bind(&item.name)
    .bind(&item.description)
    .bind(item.price_hot)
    .bind(item.price_cold)
    .bind(&item.category)
    .bind(&item.image_url)
    .bind(item.available as i64)
    .execute(db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}
