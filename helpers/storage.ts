import { kvStorage } from '@/storages'

export const setKvStorage = (
  key: string,
  value: string | boolean | Uint8Array
) => {
  kvStorage.set(key, value)
}

export const getKvStorageString = (key: string) => {
  return kvStorage.getString(key)
}

export const getKvStorageBool = (key: string) => {
  return kvStorage.getBoolean(key)
}

export const getKvStorageNumber = (key: string) => {
  return kvStorage.getNumber(key)
}

export const removeKvStorage = (key: string) => {
  kvStorage.delete(key)
}
