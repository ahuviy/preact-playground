const inBrowser = Boolean(window) && Boolean(localStorage);

/**
 * Add an item to local-storage
 */
export const set = (id, val) => {
    if (!inBrowser) return;
    localStorage.setItem(id, JSON.stringify(val));
}

/**
 * Retrieve an item from local-storage
 */
export const get = (id) => {
    if (!inBrowser) return null;
    const val = localStorage.getItem(id);
    return val ? JSON.parse(val) : null;
}

/**
 * Remove an item from local-storage
 */
export const remove = (id) => {
    if (!inBrowser) return;
    localStorage.removeItem(id);
}

/**
 * Remove all items from local-storage
 */
export const clear = () => {
    if (!inBrowser) return;
    localStorage.clear();
}
