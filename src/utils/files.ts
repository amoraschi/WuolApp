import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export async function getConfig (): Promise<any> {
  const existsFile = await exists('config.json', {
    dir: BaseDirectory.AppData
  })

  if (!existsFile) {
    await writeTextFile('config.json', '{}', {
      dir: BaseDirectory.AppData
    })
  }

  const config = await readTextFile('config.json', {
    dir: BaseDirectory.AppData
  })

  return JSON.parse(config)
}

export async function setConfig (config: any): Promise<void> {
  console.log('Config:', 'AppData')
  
  await writeTextFile('config.json', JSON.stringify(config), {
    dir: BaseDirectory.AppData
  })
}
