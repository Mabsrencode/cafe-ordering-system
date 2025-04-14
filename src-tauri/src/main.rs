// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod models;
mod services;
mod commands;
mod db;

use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_menu_table",
        sql: include_str!("../migrations/001_create_menu.sql"),
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(
            Builder::default()
                .add_migrations("sqlite:cafe_ordering_sys.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            commands::menu_commands::get_all_menu,
            commands::menu_commands::add_menu_item,
        ])
        .run(tauri::generate_context!())
        .expect("error running Tauri app");
}
