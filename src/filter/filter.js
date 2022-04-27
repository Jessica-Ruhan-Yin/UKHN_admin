/**
 * 数组过滤器 例如：{{SECTION_CHARGE | optionKV(section.charge)}}
 * @param object 例如：{CHARGE:{key:"C", value:"收费"},FREE:{key:"F", value:"免费"}}
 * @param key 例如：C
 * @returns {string} 例如：收费
 */
var optionKV = function (object, key) {
    if (!object || !key) {
        return "";
    }
    else {
        var result = "";
        for (var enums in object) {
            if (key === object[enums]["key"]) {
                result = object[enums]["value"];
            }
        }
        return result;
    }
};
/**
 * 数组过滤器 例如：{{CHARGE | optionKVArray(section.charge)}}
 * @param list 例如：[{key:"C", value:"收费"},{key:"F", value:"免费"}]
 * @param key 例如：C
 * @returns {string} 例如：收费
 */
var optionKVArray = function (list, key) {
    if (!list || !key) {
        return "";
    }
    else {
        var result = "";
        for (var i = 0; i < list.length; i++) {
            if (key === list[i]["key"]) {
                result = list[i]["value"];
            }
        }
        return result;
    }
};
/**
 * 格式化文件大小
 * @param value
 * @returns {string}
 */
var formatFileSize = function (value) {
    value = value || 0;
    var result;
    if (value > 100 * 1024) {
        result = Math.round((value / 1024 / 1024) * 100) / 100 + "MB";
    }
    else {
        result = Math.round((value / 1024) * 100) / 100 + "KB";
    }
    return result;
};
export default {
    optionKV: optionKV,
    formatFileSize: formatFileSize
};
//# sourceMappingURL=filter.js.map