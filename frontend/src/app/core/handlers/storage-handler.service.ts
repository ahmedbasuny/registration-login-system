import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHandlerService {

  constructor() { }

  getItem(storage: Storage, key: string, withParsing = false): string {
    try {
      const data: string = storage.getItem(key);
      if (data) return withParsing ? JSON.parse(data) : data;
    } catch {
      return null;
    }
  }

  setItem(storage: Storage, key: string, value: string): void {
    if (!key) return;
    const isAlreadyString = typeof value === "string";
    storage.setItem(key, isAlreadyString ? value : JSON.stringify(value));
  }

  removeItem(storage: Storage, key: string): void {
    storage.removeItem(key);
  }

  clearStorage(storage: Storage): void {
    storage.clear();
  }
}
