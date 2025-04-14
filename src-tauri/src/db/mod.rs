use sqlx::{SqlitePool, Error};

pub async fn init_db(pool: &SqlitePool) -> Result<(), Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price_hot REAL NOT NULL,
            price_cold REAL NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT,
            available BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        "#
    )
    .execute(pool)
    .await?;

    Ok(())
}

pub mod menu_repo;