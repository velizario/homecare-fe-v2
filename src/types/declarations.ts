declare global {
  // need this declaration if in a module
  interface Object {
    hasOwnProperty<K extends PropertyKey>(key: K): this is Record<K, unknown>;
  }
} // need this declaration if in a module

export {}