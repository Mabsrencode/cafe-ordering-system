// src-tauri/src/models/menu.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MenuItem {
    pub id: Option<i64>,
    pub name: String,
    pub description: String,
    pub price_hot: f64,
    pub price_cold: f64,
    pub category: String,
    pub image_url: String,
    pub available: bool,
    pub created_at: Option<String>,
}