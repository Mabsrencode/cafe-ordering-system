// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod models;
mod services;
mod commands;
mod db;
mod utils;

use sqlx::sqlite::SqlitePoolOptions;
use tauri::{Manager, generate_context, Builder};

use crate::db::init_db;

fn main() {
    Builder::default()
        .setup(|app| {
            let app_handle = app.handle();
            let app_dir = app_handle.path()
                .app_data_dir()
                .expect("failed to get app data directory");
            
            std::fs::create_dir_all(&app_dir)
                .expect("failed to create app data directory");
            
            let db_path = app_dir.join("cafe_ordering_sys.db");
            
            let db_url = format!("sqlite:{}", db_path.to_str().expect("invalid db path"));
            
            let db_result = tauri::async_runtime::block_on(async {
                SqlitePoolOptions::new()
                    .max_connections(5)
                    .connect(&db_url)
                    .await
            });

            match db_result {
                Ok(pool) => {
                    app.manage(pool.clone());
                    
                    Ok(tauri::async_runtime::block_on(async {
                        if let Err(e) = init_db(&pool).await {
                            eprintln!("❌ Failed to initialize database: {}", e);
                            return Err(e);
                        }
                        Ok(())
                    })?)
                }
                Err(e) => {
                    eprintln!("❌ Failed to connect to database: {}", e);
                    Err(Box::new(e))
                }
            }
        })
        .invoke_handler(tauri::generate_handler![
            commands::menu_commands::get_all_menu,
            commands::menu_commands::create_menu_item,
        ])
        .run(generate_context!())
        .expect("❌ Error running Tauri application");
}