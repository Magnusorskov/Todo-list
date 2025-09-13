class LocalStorageService {
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    clearData() {
        localStorage.clear();
    }
}
export default new LocalStorageService();
