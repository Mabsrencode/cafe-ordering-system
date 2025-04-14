use serde::Serialize;

#[derive(Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: String,
    pub data: Option<T>,
}

impl<T> ApiResponse<T> {
    pub fn ok(data: T) -> Self {
        Self {
            success: true,
            message: "Success".into(),
            data: Some(data),
        }
    }

    pub fn error(msg: &str) -> Self {
        Self {
            success: false,
            message: msg.into(),
            data: None,
        }
    }
}
