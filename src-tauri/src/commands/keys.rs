use crate::logic::keychain;
use crate::models::KeyStatus;

#[tauri::command]
#[specta::specta]
pub fn save_profile_api_key(profile_id: String, api_key: String) -> Result<(), String> {
    keychain::set_key(&profile_id, &api_key)
}

#[tauri::command]
#[specta::specta]
pub fn check_profile_api_key(profile_id: String) -> KeyStatus {
    KeyStatus {
        is_saved: keychain::has_key(&profile_id),
        profile_id,
    }
}

#[tauri::command]
#[specta::specta]
pub fn remove_profile_api_key(profile_id: String) -> Result<(), String> {
    keychain::delete_key(&profile_id)
}
