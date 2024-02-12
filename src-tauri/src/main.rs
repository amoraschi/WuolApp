// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main () {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![app_data_path])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn app_data_path () -> String {
  let path = tauri::api::path::config_dir();
  path.unwrap().to_str().unwrap().to_string()
}
