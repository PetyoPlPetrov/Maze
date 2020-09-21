import { useState, useEffect, useCallback } from "react";

class StorageChangedEvent extends CustomEvent {
  constructor(payload) {
    super(StorageChangedEvent.onStorageChange, { detail: payload });
  }
}

export default (key, empty, store = "session") => {
  const storage = window[store + "Storage"];
  const [value, setValue] = useState(() =>
    storage.getItem(key) ? JSON.parse(storage.getItem(key)) : empty
  );

  const setState = useCallback(
    (state) => {
      const newValue = typeof state === "function" ? state(value) : state;
      storage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(
        new StorageChangedEvent({ key, newValue, storageArea: storage })
      );
    },
    [key, value, storage]
  );

  useEffect(() => {
    if (!storage.getItem(key)) {
      empty && setState(empty); //setting the default value
    }
  }, [empty, key, storage]); //eslint-disable-line

  useEffect(() => {
    const onStorageChange = (event) => {
      const payload = event.detail || event;
      const { key: id, newValue, storageArea } = payload;

      if (storageArea === storage && id === key && newValue !== undefined) {
        setValue(newValue);
      }
    };

    window.addEventListener(
      StorageChangedEvent.onStorageChange,
      onStorageChange
    );

    return () => {
      window.removeEventListener(
        StorageChangedEvent.onStorageChange,
        onStorageChange
      );
    };
  }, [key, storage]);

  return [value, setState];
};
