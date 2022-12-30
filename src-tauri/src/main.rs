#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;
use tauri::Manager;

#[ tauri::command]
fn create(name: &str) -> () {
    match fs::create_dir(name) {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(_) => {},
    }
}

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }

    window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create, close_splashscreen])
        .setup(|app| {
              let splashscreen_window = app.get_window("splashscreen").unwrap();
              let main_window = app.get_window("main").unwrap();
              // we perform the initialization code on a new task so the app doesn't freeze
              tauri::async_runtime::spawn(async move {
                // initialize your app here instead of sleeping :)
                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(2));
                println!("Done initializing.");

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
              });
              Ok(())
         })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
