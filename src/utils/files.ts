import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { Config } from '@/types/Common'

export async function getConfig (): Promise<Config> {
  const existsFile = await exists('wuolapp.json', {
    dir: BaseDirectory.LocalData
  })

  if (!existsFile) {
    await writeTextFile('wuolapp.json', '{}', {
      dir: BaseDirectory.LocalData
    })
  }

  const config = await readTextFile('wuolapp.json', {
    dir: BaseDirectory.LocalData
  })

  return JSON.parse(config)
}

export async function setConfig (config: Config): Promise<void> {
  console.log('Config:', 'Local')

  await writeTextFile('wuolapp.json', JSON.stringify(config), {
    dir: BaseDirectory.LocalData
  })
}
