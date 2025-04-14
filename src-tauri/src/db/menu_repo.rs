use sqlx::{SqlitePool, Row, query};
use crate::models::menu::MenuItem;

pub async fn fetch_all_menu_items(db: &SqlitePool) -> Result<Vec<MenuItem>, sqlx::Error> {
    let rows = sqlx::query("SELECT * FROM menu")
        .fetch_all(db)
        .await?;

    let items = rows
        .into_iter()
        .map(|row| MenuItem {
            id: row.try_get("id").ok(),
            name: row.get("name"),
            description: row.get("description"),
            price_hot: row.get("price_hot"),
            price_cold: row.get("price_cold"),
            category: row.get("category"),
            image_url: row.get("image_url"),
            available: row.get::<i64, _>("available") != 0,
            created_at: row.try_get("created_at").ok(),
        })
        .collect();

    Ok(items)
}

pub async fn insert_menu_item(db: &SqlitePool, item: MenuItem) -> Result<i64, sqlx::Error> {
    let result = query(
        "INSERT INTO menu (
            name,
            description,
            price_hot,
            price_cold,
            category,
            image_url,
            available
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)"
    )
    .bind(&item.name)
    .bind(&item.description)
    .bind(item.price_hot)
    .bind(item.price_cold)
    .bind(&item.category)
    .bind(&item.image_url)
    .bind(item.available as i64)
    .execute(db)
    .await?;

    Ok(result.last_insert_rowid())
}