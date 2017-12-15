import * as localStorageService from './local-storage.service';

/**
 * Basic CRUD for clients using LocalStorage as a mock back end.
 */
export const clients = {
    get: (id) => {
        const db = localStorageService.get('db') || getEmptyDb();
        if (id) {
            const client = db.clients.find(c => c.id === id);
            return client ? Promise.resolve([client]) : Promise.resolve([]);
        }
        return Promise.resolve(db.clients);
    },
    delete: (clientId) => {
        const db = localStorageService.get('db') || getEmptyDb();
        db.clients = db.clients.filter(client => client.id !== clientId);
        db.orders = db.orders.filter(o => o.clientId !== clientId);
        localStorageService.set('db', db);
        return Promise.resolve(db.clients);
    },
    add: (clientToAdd) => {
        const db = localStorageService.get('db') || getEmptyDb();
        const existingIds = db.clients.map(c => c.id);
        const id = genUniqueId(existingIds);
        const added = Object.assign({}, clientToAdd, { id });
        db.clients.push(added);
        localStorageService.set('db', db);
        return Promise.resolve(added);
    },
    edit: (newClient) => {
        const db = localStorageService.get('db') || getEmptyDb();
        const edited = db.clients.find(c => c.id === newClient.id);
        if (!edited) return Promise.resolve(null);
        Object.assign(edited, newClient);
        localStorageService.set('db', db);
        return Promise.resolve(edited);
    }
}

/**
 * Basic CRUD for orders using LocalStorage as a mock back end.
 */
export const orders = {
    get: () => {
        const db = localStorageService.get('db') || getEmptyDb();
        return Promise.resolve(db.orders);
    },
    delete: (orderId) => {
        const db = localStorageService.get('db') || getEmptyDb();
        db.orders = db.orders.filter(order => order.id !== orderId);
        localStorageService.set('db', db);
        return Promise.resolve(db.orders);
    },
    add: (orderToAdd) => {
        const db = localStorageService.get('db') || getEmptyDb();
        const existingIds = db.orders.map(o => o.id);
        const id = genUniqueId(existingIds);
        const added = Object.assign({}, orderToAdd, { id });
        db.orders.push(added);
        localStorageService.set('db', db);
        return Promise.resolve(added);
    },
    edit: (newOrder) => {
        const db = localStorageService.get('db') || getEmptyDb();
        const edited = db.orders.find(o => o.id === newOrder.id);
        if (!edited) return Promise.resolve(null);
        Object.assign(edited, newOrder);
        localStorageService.set('db', db);
        return Promise.resolve(edited);
    }
}

const genUniqueId = (existingIds) => {
    existingIds = existingIds || [];
    let genId = () => Math.floor(Math.random() * (10 ** 8)).toString();
    let id;
    do {
        id = genId();
    } while (existingIds.includes(id));
    return id;
}

const getEmptyDb = () => {
    return { clients: [], orders: [] };
}
