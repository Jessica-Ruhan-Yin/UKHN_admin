LOCAL_KEY_REMEMBER_USER = "LOCAL_KEY_REMEMBER_USER"; // 点击图片到详情时保存图片信息
LocalStorage = {
    get: function (key) {
        let v = localStorage.getItem(key);
        if (v && typeof (v) !== "undefined" && v !== "undefined") {
            return JSON.parse(v);
        }
    },
    set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clearAll: function () {
        localStorage.clear();
    }
};