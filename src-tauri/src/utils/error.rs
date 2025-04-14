
use serde::Serialize;

#[derive(Debug, Serialize)]
pub enum AppError {
    DatabaseError(String),
    UnknownError(String),
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl From<String> for AppError {
    fn from(err: String) -> Self {
        AppError::UnknownError(err)
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::DatabaseError(err.to_string())
    }
}
