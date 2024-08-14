// var _jquery = require('jquery');

// var _jquery2 = _interopRequireDefault(_jquery);

// var _lodash = require('lodash');

// var _lodash2 = _interopRequireDefault(_lodash);

import lodash from 'lodash';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * EiInfo，数据请求工具 EiCommunicator
                                                                                                                                                           * TODO 1、尝试解除对jQuery和Underscore的依赖，移动js复制了$和_的部分关键函数
                                                                                                                                                           * TODO 2、响应式的EiInfo
                                                                                                                                                           *
                                                                                                                                                           *
                                                                                                                                                           * 只依赖./init/eplat.js
                                                                                                                                                           * (ui.init-->ui.eiinfo-->ui.core-->ui.component--> ui.util)
                                                                                                                                                           */

/**
 * @class AbstractEi
 * @description AbstractEi是EiInfo的基类，EiInfo，EiBlock，EiColumn，EiBlockMeta都继承于此类
 */

var E = {};
// 复用 lodash 常用的数据类型判断函数
E.isNull = lodash.isNull;
E.isUndefined = lodash.isUndefined;
E.isBoolean = lodash.isBoolean;
E.isNumber = lodash.isNumber;
E.isString = lodash.isString;
E.isDate = lodash.isDate;
E.isObject = lodash.isObject;

var isString = E.isString;

// 解决instanceof 在子窗口 iframe中的不安全性，确定数据类型
function isEiColumn(eiColumn) {
    return isAvailable(eiColumn) && eiColumn.__ClassName__ === "EiColumn";
}

function isEiBlockMeta(eiBlockMeta) {
    return isAvailable(eiBlockMeta) && eiBlockMeta.__ClassName__ === "EiBlockMeta";
}

function isEiBlock(eiBlock) {
    return isAvailable(eiBlock) && eiBlock.__ClassName__ === "EiBlock";
}

function isEiInfo(eiInfo) {
    return isAvailable(eiInfo) && eiInfo.__ClassName__ === "EiInfo";
}

/**
 * 判断某一对象是否为空。
 * @param {Object} obj   所要判断的对象
 * @return {boolean}    若obj为空对象(null或undefined)或是空字符串("")， 返回false，否则返回true。
 * @exception 无异常抛出
 */
function isAvailable(obj) {
    if (obj === undefined) {
        return false;
    }

    if (obj === null) {
        return false;
    }

    return obj !== "";
}
/**
 * 判断trim后的字符串是否为空
 *
 * @param {String} str 源字符串
 * @return {*|boolean}E
 */
function isBlankString(str) {
    return E.isString(str) && str.replace(/^\s+|\s+$/g, '').length === 0;
}



var AbstractEi = function () {
    function AbstractEi() {
        _classCallCheck(this, AbstractEi);

        this.extAttr = {};
    }

    /**
     * 根据属性名得到属性值
     * @param {String} prop 属性名
     * @return {Object} 属性名对应的值
     */


    AbstractEi.prototype.get = function get(prop) {
        return this.extAttr[prop];
    };

    /**
     * 设置属性值
     * @param {Object} prop 属性名
     * @param {Object} value 属性名对应的值
     */


    AbstractEi.prototype.set = function set(prop, value) {
        this.extAttr[prop] = value;
    };

    /**
     * 取得属性JSON对象
     * @return {Object} 属性对象
     */


    AbstractEi.prototype.getAttr = function getAttr() {
        return this.extAttr;
    };

    /**
     * 设置属性JSON对象
     * @param {Object} attr 要设置的属性对象
     */

    AbstractEi.prototype.setAttr = function setAttr(attr) {
        this.extAttr = attr;
    };

    return AbstractEi;
}();

/**
 * @class EiColumn
 * @description EiColumn构造函数，用于描述列的元数据信息
 * @extends AbstractEi
 * @constructor
 * @param {String} name EiColumn 名称
 */


var EiColumn = function (_AbstractEi) {
    _inherits(EiColumn, _AbstractEi);

    function EiColumn(name) {
        _classCallCheck(this, EiColumn);

        var _this = _possibleConstructorReturn(this, _AbstractEi.call(this));

        for (var key in EiColumn.defaults) {
            _this[key] = EiColumn.defaults[key];
        }
        _this.name = name;
        return _this;
    }

    /**
     * 解析JSON对象中的EiColumn信息 JSON ==> EiColumn
     * @param {Object} columnJson
     */
    EiColumn.parseColumn = function parseColumn(columnJson) {
        var column = new EiColumn(columnJson.name);

        for (var prop in columnJson) {
            var columnValue = columnJson[prop];
            if (columnValue && columnValue.replace) {
                // HTML字符转义 http://www.w3school.com.cn/html/html_entities.asp
                columnValue = columnValue.replace(/'/g, '&#39;');
            }
            column[prop] = columnValue;
        }

        // 使用iplatWidth= true来标记自定义width的column
        // if (!!columnJson['width']) {
        if (columnJson['width']) {
            column['iplatWidth'] = true;
        }
        return column;
    };

    /**
     * EiColumn对象转成JSON对象
     * @returns {Object} JSON对象
     */


    EiColumn.prototype.toJSON = function toJSON() {
        var column = {};
        var compress = arguments[0];

        if (compress) {
            // 网络传输时，字段默认值没有变化的，不序列化到JSON中,减少传输的内容
            for (var prop in this) {
                if (this.hasOwnProperty(prop) && this[prop] !== EiColumn.defaults[prop]) {
                    column[prop] = this[prop];
                }
            }
        } else {
            // 完整的EiColumn属性信息
            for (var key in this) {
                if (this.hasOwnProperty(key) && isAvailable(this[key])) {
                    column[key] = this[key];
                }
            }
        }
        delete column.extAttr;
        return column;
    };

    return EiColumn;
}(AbstractEi);

/**
 * @class EiBlockMeta
 * @description EiBlockMeta构造函数，EiBlockMeta列头类；EiBlock的元数据定义（EiColumn）集合，可以理解为EiColumns
 * @extends AbstractEi
 * @constructor
 * @param {string} blockId blockId
 */


EiColumn.defaults = {
    pos: -1,
    name: '',
    descName: '',
    type: 'C',
    regex: null,
    formatter: null,
    editor: 'text',
    minLength: 0,
    maxLength: Math.pow(2, 31) - 1,
    primaryKey: false,
    nullable: true,
    visible: true,
    readonly: false,
    displayType: 'text',
    errorPrompt: null,
    dateFormat: null,
    defaultValue: '',
    validateType: null,
    width: 96,
    height: 18,
    align: 'left',
    blockName: null,
    sourceName: null,
    labelProperty: null,
    valueProperty: null
};

var EiBlockMeta = function (_AbstractEi2) {
    _inherits(EiBlockMeta, _AbstractEi2);

    function EiBlockMeta(blockId) {
        _classCallCheck(this, EiBlockMeta);

        var _this2 = _possibleConstructorReturn(this, _AbstractEi2.call(this));

        _this2.blockId = blockId;
        _this2.metas = {}; // {eiColumn.name: eiColumn}
        _this2.desc = '';
        _this2.extAttr = {};
        _this2.colCount = 0;
        return _this2;
    }

    /**
     * 设置EiBlockMeta列头类的描述
     * @param {String} desc 列头描述信息
     */


    EiBlockMeta.prototype.setDesc = function setDesc(desc) {
        this.desc = desc;
    };

    /**
     * 取得列头描述信息
     * @return {String} 列头描述
     */


    EiBlockMeta.prototype.getDesc = function getDesc() {
        return this.desc;
    };

    /**
     * 添加列头信息 Meta信息就是EiColumn
     * @param {EiColumn} eiColumn 列信息
     * @throws Error异常
     */


    EiBlockMeta.prototype.addMeta = function addMeta(eiColumn) {
        if (isEiColumn(eiColumn)) {
            this.metas[eiColumn.name] = eiColumn;
            if (eiColumn.pos < 0) eiColumn.pos = this.colCount;
            this.colCount++;
        } else {
            throw new Error('请检查参数，必须添加EiColumn对象');
        }
    };

    /**
     * 根据列名，获取列信息EiColumn
     * @param {String} name 列名称
     * @return {EiColumn} 列信息
     * @exception 无异常抛出
     */


    EiBlockMeta.prototype.getMeta = function getMeta(name) {
        return this.metas[name];
    };

    /**
     * 根据列名，删除列信息
     * @param {String} name 列名称
     */


    EiBlockMeta.prototype.removeMeta = function removeMeta(name) {
        delete this.metas[name];
    };

    /**
     * 获取所在的blockId
     * @return {String} 所在的blockId
     */


    EiBlockMeta.prototype.getBlockId = function getBlockId() {
        return this.blockId;
    };

    /**
     * 取得列头所有的列信息
     * @return {Object} 列头所有的列信息
     */


    EiBlockMeta.prototype.getMetas = function getMetas() {
        return this.metas;
    };

    /**
     * EiBlockMeta对象转换成JSON对象
     * @returns {Object} JSON对象
     */


    EiBlockMeta.prototype.toJSON = function toJSON() {
        var blockMeta = {},
            compress = arguments[0];

        blockMeta[EiInfoJsonConstants.BLOCK_META_DESC] = this.getDesc();
        blockMeta[EiInfoJsonConstants.ATTRIBUTES] = this.getAttr();

        var columns = [];
        for (var columnName in this.metas) {
            columns.push(this.metas[columnName].toJSON(compress)); // EiColumn.prototype.toJSON
        }
        blockMeta[EiInfoJsonConstants.BLOCK_META_COLUMNLIST] = columns;

        return blockMeta;
    };

    /**
     * 解析JSON对象中的EiBlockMeta信息 JSON ==> EiBlockMeta
     * @param {String} blockId blockId
     * @param {Object} blockMetaJson EiBlockMeta的JSON对象
     */


    EiBlockMeta.parseBlockMeta = function parseBlockMeta(blockId, blockMetaJson) {
        var blockMeta = new EiBlockMeta(blockId);

        var value = blockMetaJson[EiInfoJsonConstants.BLOCK_META_DESC];
        if (isAvailable(value)) {
            blockMeta.setDesc(value);
        }

        value = blockMetaJson[EiInfoJsonConstants.ATTRIBUTES];
        if (isAvailable(value)) {
            blockMeta.setAttr(value);
        }

        value = blockMetaJson[EiInfoJsonConstants.BLOCK_META_COLUMNLIST];
        if (isAvailable(value)) {
            // value should be Array
            for (var i = 0; i < value.length; i++) {
                var eiColumn = EiColumn.parseColumn(value[i]);
                blockMeta.addMeta(eiColumn);
            }
        }
        return blockMeta;
    };

    return EiBlockMeta;
}(AbstractEi);

/**
 * @class EiBlock
 * @description EiBlock 数据信息的主要载体
 * @constructor
 * @extends AbstractEi
 * @param {String|EiBlockMeta} blockId blockId字符串或者EiBlockMeta对象
 */


var EiBlock = function (_AbstractEi3) {
    _inherits(EiBlock, _AbstractEi3);

    function EiBlock(blockId) {
        _classCallCheck(this, EiBlock);

        var _this3 = _possibleConstructorReturn(this, _AbstractEi3.call(this));

        if (typeof blockId === 'string') {
            _this3.meta = new EiBlockMeta(blockId);
        } else if (isEiBlockMeta(blockId)) {
            _this3.meta = blockId;
        } else {
            throw new Error('请检查参数类型，无法创建EiBlock');
        }

        _this3.rows = []; // rows是二维数组 [[],[],[]]
        _this3.colCount = 0;
        _this3.extAttr = {};
        return _this3;
    }

    /**
     * 获取block的列头信息 EiBlockMeta
     * @return {EiBlockMeta} 返回block的列头信息
     */


    EiBlock.prototype.getBlockMeta = function getBlockMeta() {
        return this.meta;
    };

    /**
     * 设置block的列头信息 EiBlockMeta
     * @param {EiBlockMeta} blockMeta block所在列的列头信息
     */


    EiBlock.prototype.setBlockMeta = function setBlockMeta(blockMeta) {
        this.meta = blockMeta;
    };

    /**
     * 获取EiBlock的blockId
     * @return {String} EiBlock的blockId
     */


    EiBlock.prototype.getBlockId = function getBlockId() {
        return this.getBlockMeta().getBlockId();
    };

    /**
     * 给block所在列添加行数据
     * @param {Array} row 行数据
     */


    EiBlock.prototype.addRow = function addRow(row) {
        if (row == null) {
            this.rows.push([]);
        } else {
            this.rows.push(row);
        }
    };

    /**
     * 取得block所有行数据
     * @return {Array} 返回block的行数据
     */


    EiBlock.prototype.getRows = function getRows() {
        return this.rows;
    };

    /**
     * 设置block所有行数据
     * @param {Array} rows 重置block的行数据的数组
     */


    EiBlock.prototype.setRows = function setRows(rows) {
        this.rows = rows;
    };

    /**
     * 根据列名在EiBlock中获取列信息 EiColumn
     * @param {String} colName 列名
     * @returns {EiColumn|null}
     */


    EiBlock.prototype.getColumn = function getColumn(colName) {
        return this.getBlockMeta().getMeta(colName) || null;
    };

    /**
     * 根据列名，获取EiColumn的位置pos信息
     * @param colName 列名
     * @returns {Number} 没有对应的列，返回-1
     */


    EiBlock.prototype.getColumnPos = function getColumnPos(colName) {
        var column = this.getColumn(colName);
        return column != null ? column.pos : -1;
    };

    /**
     * 根据列名数组，移除EiBlock中列信息
     * @param{Array} colNames 列名数组
     */


    EiBlock.prototype.removeColumns = function removeColumns(colNames) {
        var that = this,
            blockMeta = that.getBlockMeta(),
            rows = that.getRows(),
            removeColPos = [];

        colNames.forEach(function (colName) {
            // meta数据删除
            if (isAvailable(that.getColumn(colName))) {
                var colPos = that.getColumnPos(colName);
                removeColPos.push(colPos);

                blockMeta.removeMeta(colName);
                blockMeta.colCount--;
            }
        });

        if (rows.length > 0) {
            // rows数据删除，先进行数组排序，再迭代
            removeColPos.sort(function (a, b) {
                return b - a;
            }).forEach(function (colPos) {
                rows.forEach(function (row) {
                    row.splice(colPos, 1);
                });
            });
        }
    };

    /**
     * 根据指定行号及列名,设定其数据值.
     * @param {Number} rowNo 行号
     * @param {String} colName 列名
     * @param {String} value 数据值
     */

    EiBlock.prototype.setCell = function setCell(rowNo, colName, value) {
        var pos = this.getColumnPos(colName);
        if (pos >= 0) {
            while (typeof this.rows[rowNo] === 'undefined') {
                // rows的行数小于rowNo，添加空行处理
                this.addRow(null);
            }
            this.rows[rowNo][pos] = value;
        }
    };

    /**
     * 根据指定行号、列名，取得数据值
     * @param {Number} rowNo 行号
     * @param {String} colName 列名
     * @return {String} value 数据值
     */


    EiBlock.prototype.getCell = function getCell(rowNo, colName) {
        var rows = this.getRows(),
            pos = this.getColumnPos(colName);

        if (rows.length === 0 || pos < 0) {
            // 解决有对应col无rows数据时,get报错问题
            return '';
        } else {
            return isAvailable(rows[rowNo][pos]) ? rows[rowNo][pos] : '';
        }
    };

    /**
     * 根据行号、列号，取得数据值
     * @param {Number} rowNo 行号
     * @param {Number} colPos 列号
     * @return {String} value 数据值
     */


    EiBlock.prototype.getCellByPos = function getCellByPos(rowNo, colPos) {
        return this.rows[rowNo][colPos];
    };

    /**
     * JSON格式的一行数据，拉平成一行数组数据 {key: value} ==> [value]
     * @param {Object} rowJson  key，value形式的一行json数据
     * @param {Boolean} transport 传送到后台数据库的数据的默认值处理
     * @param {Boolean} isNew 数据是新增的
     * @return {Array} JSON对象拉平后的数组数据
     */


    EiBlock.prototype.getMappedArray = function getMappedArray(rowJson, transport, isNew) {
        var metas = this.getBlockMeta().getMetas(); // {eiColumn.name: eiColumn}
        var row = [];
        for (var colName in metas) {
            if (metas.hasOwnProperty(colName)) {
                var pos = this.getColumnPos(colName);
                if (pos >= 0) {
                    if (transport) {
                        if (metas[colName].type === 'N') {
                            // 2017-09-17 JSON Lib 丢失精度的问题, N类型的数据到后台还是String JavaBean 处理
                            row[pos] = (rowJson[colName] || 0) + '';
                        } else {
                            row[pos] = rowJson[colName] || '';

                            // grid _mapModels 遵守数据库规范，新增数据时'' 默认转为 ' '
                            if (isNew) {
                                row[pos] = row[pos] || ' ';
                            }
                        }
                    } else {
                        row[pos] = rowJson[colName];
                    }
                }
            }
        }
        return row;
    };

    /**
     * 一行数组数据转换成为一行key，value的json格式的数据 [value] ==> {key: value}
     * @param {Array} row
     * @return {Object} 由数组数据还原后的JSON对象
     */


    EiBlock.prototype.getMappedObject = function getMappedObject(row) {
        var metas = this.getBlockMeta().getMetas();
        var rowJson = {};
        for (var colName in metas) {
            if (metas.hasOwnProperty(colName)) {
                var eiColumn = metas[colName];

                if (eiColumn.type === 'N') {
                    rowJson[eiColumn.name] = row[eiColumn.pos] * 1; // 后台会把N类型的数据设为字符串
                } else {
                    rowJson[eiColumn.name] = row[eiColumn.pos];
                }
            }
        }
        return rowJson;
    };

    /**
     * 将block中所有的rows二维数组转换为json数组(Spring MVC)
     * [[],[],[]] ==> [{},{},{}]
     * @return {Array} 由EiBlock所有的行数据转换成的JSON对象数组
     */


    EiBlock.prototype.getMappedRows = function getMappedRows() {
        var rowsJson = [];
        for (var i = 0; i < this.rows.length; i++) {
            var row = this.rows[i];
            var rowJson = this.getMappedObject(row);
            rowsJson.push(rowJson);
        }
        return rowsJson;
    };

    /**
     * EiBlock对象转换为JSON Object
     */


    EiBlock.prototype.toJSON = function toJSON() {
        var block = {},
            compress = arguments[0];

        // let options = $.extend({}, IPLATUI.Config.EiInfo, arguments[0]);

        block[EiInfoJsonConstants.ATTRIBUTES] = this.getAttr();
        block[EiInfoJsonConstants.BLOCK_META] = this.getBlockMeta().toJSON(compress);
        block[EiInfoJsonConstants.BLOCK_DATA] = this.getRows(); // rows: [[], []]


        // 提交到后台时
        // if (options.transport) {
        //     block[EiInfoJsonConstants.BLOCK_DATA] = transportEiBlock(this.getRows());
        // }

        return block;
    };

    /**
     * 复制当前的EiBlock对象
     */


    EiBlock.prototype.clone = function clone() {
        return EiBlock.parseBlock(this.getBlockId(), this.toJSON());
    };

    /**
     * 通过列英文名数组，或者[{field1: '', field2: ''},{},{}]形式的数组创建EiBlock
     * @param blockId 数据块的id
     * @param data 列名数组或者JSON形式的数据行
     * @return {EiBlock}
     */


    EiBlock.build = function build(blockId, data) {
        var block = new EiBlock(blockId),
            rowData = false,
            columns = [];

        // if (_jquery2.default.isArray(data)) {
        if(lodash.isArray(data)){
            var blockMeta = new EiBlockMeta(blockId);
            // if (_jquery2.default.isPlainObject(data[0])) {
            if (lodash.isPlainObject(data[0])) {
                // 数据行
                for (var columnName in data[0]) {
                    columns.push(columnName);
                }
                rowData = true;
            } else {
                // 列英文名数组
                columns = data;
            }

            // TODO 修改成Array.forEach
            // _jquery2.default.each(columns, function (i, columnName) {
            //     blockMeta.addMeta(new EiColumn(columnName));
            // });
            columns.forEach(function (columnName) {
                blockMeta.addMeta(new EiColumn(columnName));
            });

            block.setBlockMeta(blockMeta);

            if (rowData) {
                // JSON Data Array 数据行
                for (var i = 0; i < data.length; i++) {
                    block.addRow(block.getMappedArray(data[i]));
                }
            }

            return block;
        }

        return block;
    };

    /**
     * 通过列英文名数组，列中文名数组，创建EiBlock
     *
     * @param blockId 数据块的id
     * @param enames 列英文名数组
     * @param cnames 列中文名数组
     * @return {EiBlock}
     */


    EiBlock.buildByNames = function buildByNames(blockId, enames, cnames) {
        var block = new EiBlock(blockId),
            // hasCnames = _jquery2.default.isArray(cnames);
            hasCnames = lodash.isArray(cnames);

        // if (_jquery2.default.isArray(enames)) {
        if(lodash.isArray(enames)){
            var blockMeta = new EiBlockMeta(blockId);

            // _jquery2.default.each(enames, function (i, ename) {
            enames.forEach(function(ename, i){
                var eiColumn = new EiColumn(ename);

                if (hasCnames && isAvailable(cnames[i])) {
                    eiColumn.descName = cnames[i];
                }

                blockMeta.addMeta(eiColumn);
            });

            block.setBlockMeta(blockMeta);
        }

        return block;
    };

    /**
     * 通过[{field: '', title: ''}, ...] 数组，创建EiBlock
     *
     * @param blockId 数据块的id
     * @param columns kendoGrid的columns数组
     * @return {EiBlock}
     */


    EiBlock.buildByColumns = function buildByColumns(blockId, columns) {
        var block = new EiBlock(blockId);
        var blockMeta = new EiBlockMeta(blockId);
        var key = void 0;

        // _jquery2.default.each(columns, function (i, column) {
        columns.forEach(function (column){
            var eiColumn = new EiColumn(column['field']);

            // 根据 EiColumn.defaults 来赋予 EiColumn 的属性值
            for (key in EiColumn.defaults) {
                if (key in column && column[key] != undefined) {
                    eiColumn[key] = column[key];
                }
            }

            eiColumn.descName = column['title'];
            blockMeta.addMeta(eiColumn);
        });

        block.setBlockMeta(blockMeta);
        return block;
    };

    /**
     * 解析JSON对象中的EiBlock信息 JSON ==> EiBlock
     * @param {String} blockId
     * @param {Object} blockJson
     */


    EiBlock.parseBlock = function parseBlock(blockId, blockJson) {
        var block = void 0;
        var value = blockJson[EiInfoJsonConstants.BLOCK_META];

        if (isAvailable(value)) {
            var blockMeta = EiBlockMeta.parseBlockMeta(blockId, value);
            block = new EiBlock(blockMeta);
        } else {
            block = new EiBlock(blockId);
        }

        value = blockJson[EiInfoJsonConstants.ATTRIBUTES];
        if (isAvailable(value)) {
            block.setAttr(value);
        }

        value = blockJson[EiInfoJsonConstants.BLOCK_DATA];
        if (isAvailable(value)) {
            block.rows = value;
        }
        return block;
    };

    return EiBlock;
}(AbstractEi);

// // 私有的内部处理数据的方法
// let number2string(value) {
//     return IPLAT.isNumber(value) ? value + '' : value;
// };
//
// let notEmpty(value) {
//     // 把null 和 undefined 都转换为' '
//     if (value == null) {
//         return ' ';
//     }
//
//     // 把'' 转换为 ' '
//     if (IPLAT.isString(value) && value.length === 0) {
//         return ' ';
//     }
//
//     return value;
// };
//
// let filterChain(filters, value) {
//     let temp = value;
//     for (let i = 0, length = filters.length; i < length; i++) {
//         temp = filters[i].call(null, temp);
//     }
//
//     return temp;
// };
//
// /**
//  * 转换 block 中内容
//  * @param eiBlock
//  * @param options
//  * @returns {*}
//  */
// EiBlock.transportContentByFormattransportContentByFormat(eiBlock, options) {
//     let filters = [], rows, row;
//     let defaults = {Number2Str: true, NotEmpty: true};
//
//     options = $.extend(options, defaults);
//
//
//     if (!IPLAT.isEiBlock(eiBlock)) {
//         return eiBlock;
//     }
//
//     if (options['Number2Str']) {
//         filters.push(number2string);
//     }
//
//     if (options['NotEmpty']) {
//         filters.push(notEmpty);
//     }
//
//     if (!filters.length) {
//         return eiBlock;
//     }
//
//     rows = eiBlock.rows || eiBlock.getRows();
//     for (let i = 0; i < rows.length; i++) {
//         row = rows[i];
//         _.each(row, function (item, i, context) {
//             context[i] = filterChain(filters, item);
//         })
//     }
//
//     return eiBlock;
// };
//
// EiBlock.prototype.transportContentByFormat(options) {
//     return transportContentByFormat(this, options);
// };

var EiInfo = function (_AbstractEi4) {
    _inherits(EiInfo, _AbstractEi4);

    /**
     * @class EiInfo
     * @description EiInfo 对象构造函数
     * @constructor
     * @extends AbstractEi
     */
    function EiInfo(name) {
        _classCallCheck(this, EiInfo);

        var _this4 = _possibleConstructorReturn(this, _AbstractEi4.call(this));

        _this4.name = '';
        _this4.descName = '';
        _this4.msg = '';
        _this4.msgKey = '';
        _this4.detailMsg = '';
        _this4.status = 0;
        _this4.blocks = {};
        _this4.extAttr = {};
        this.__version__ = '2.0';

        if (typeof name === 'string') {
            _this4.name = name;
        }

        // if (IPLATUI.Config.EiInfo.version) {
        //     // EiInfo版本信息的全局配置, 2.0 版本EiInfo 引入的新结构
        //     this.__version__ = IPLATUI.Config.EiInfo.version;
        //     this.traceId = '';
        //
        //     // this.__context__ = { // TODO context提取成为类 提供API
        //     //     userId: '',
        //     //     uuid: '',
        //     //     spanId: '',
        //     //     traceId: ''
        //     // };
        // }
        return _this4;
    }

    /**
     * 取得EiInfo的名称
     * @return {String} EiInfo名称
     */


    EiInfo.prototype.getName = function getName() {
        return this.name;
    };

    /**
     * 设置EiInfo的名称
     * @param {String} name EiInfo名称
     */


    EiInfo.prototype.setName = function setName(name) {
        this.name = name;
    };

    /**
     * 以三段式的方式从EiInfo中获取某字段的值，无法获取值是返回null
     * @param {String} str 三段式blockName-RowNum-ColName 如'result-0-siteArticleButton'
     */


    EiInfo.prototype.get = function get(str) {
        if (!isString(str) || isBlankString(str)) {
            // 参数不是字符串，或者是空串时，直接返回null
            return null;
        }

        var strArray = str.split('-');
        var block = void 0;
        if (3 === strArray.length) {
            // 三段式，获取block的Cell值
            block = this.getBlock(strArray[0]); // blockName
            if (isAvailable(block)) {
                // rowNum colName，EiBlock.getCell没有对应值时， 返回 ''
                return block.getCell(parseInt(strArray[1]), strArray[2]);
            } else {
                return null;
            }
        } else if (2 === strArray.length) {
            // 两段式，获取block的属性区attr中的属性值
            block = this.getBlock(strArray[0]); // blockName
            if (isAvailable(block)) {
                // attrName 没有对应值时，返回undefined
                return block.get(strArray[1]);
            } else {
                return null;
            }
        }

        // 一段式，获取EiInfo的属性区的属性值 attrName，没有对应值时，返回undefined
        return this.extAttr[strArray[0]];
    };

    /**
     * 设置EiInfo消息信息
     * @param {String} msg 消息信息
     */


    EiInfo.prototype.setMsg = function setMsg(msg) {
        this.msg = msg;
    };

    /**
     * 取得EiInfo消息信息
     * @return {String}  消息信息
     */


    EiInfo.prototype.getMsg = function getMsg() {
        return this.msg;
    };

    /**
     * 设置EiInfo消息信息键
     * @param {String} msgKey
     */


    EiInfo.prototype.setMsgKey = function setMsgKey(msgKey) {
        this.msgKey = msgKey;
    };

    /**
     * 取得EiInfo消息信息键
     * @return {String}  消息信息键
     */


    EiInfo.prototype.getMsgKey = function getMsgKey() {
        return this.msgKey;
    };

    /**
     * 设置EiInfo的详细信息
     * @param {String} sMsg  详细信息
     */


    EiInfo.prototype.setDetailMsg = function setDetailMsg(sMsg) {
        this.detailMsg = sMsg;
    };

    /**
     * 取得EiInfo的详细信息
     * @return {String}  详细信息
     */


    EiInfo.prototype.getDetailMsg = function getDetailMsg() {
        return this.detailMsg;
    };

    /**
     * 设置EiInfo的状态
     * @param {Number} status 状态
     */


    EiInfo.prototype.setStatus = function setStatus(status) {
        this.status = status;
    };

    /**
     * 取得EiInfo状态
     * @return {Number}  状态
     */


    EiInfo.prototype.getStatus = function getStatus() {
        return this.status;
    };

    /**
     * 设置EiInfo描述信息
     * @param {String} desc 描述信息
     */


    EiInfo.prototype.setDescName = function setDescName(desc) {
        this.descName = desc;
    };

    /**
     * 取得EiInfo描述信息
     * @return {String} 描述信息
     */


    EiInfo.prototype.getDescName = function getDescName() {
        return this.descName;
    };

    /**
     * 给EiInfo添加EiBlock块
     *
     * @param {EiBlock} eiBlock EiBlock对象
     * @see EiBlock
     */


    EiInfo.prototype.addBlock = function addBlock(eiBlock) {
        this.blocks[eiBlock.getBlockId()] = eiBlock;
    };

    /**
     * 根据blockId从EiInfo取得EiBlock块
     * @param {String} blockId
     * @return {EiBlock}  EiBlock块
     * @see EiBlock
     */


    EiInfo.prototype.getBlock = function getBlock(blockId) {
        return this.blocks[blockId];
    };

    /**
     * 取得EiInfo所有的EiBlock块
     * @return {Object} EiBlock块 {blockId: eiBlock}
     */


    EiInfo.prototype.getBlocks = function getBlocks() {
        return this.blocks;
    };

    /**
     * 根据key名,按照块名、行号、列名规则，以'-'分隔，设置其值.
     */


    EiInfo.prototype.set = function set() {
        var blockId = void 0;

        if (arguments.length > 2) {
            blockId = arguments[0];
            if (typeof this.blocks[blockId] == 'undefined') {
                this.blocks[blockId] = new EiBlock(blockId);
            }
        }

        // 按照块名、行号、列名三段式参数解析
        switch (arguments.length) {
            case 2:
                // 设置EiInfo的属性值
                if (typeof arguments[0] == 'string') {
                    var strArray = arguments[0].split('-');
                    if (strArray.length == 1) {
                        // 设置属性区
                        AbstractEi.prototype.set.apply(this, arguments);
                    } else if (strArray.length == 2) {
                        // 设置EiBlock的属性区
                        this.set(strArray[0], strArray[1], arguments[1]);
                    } else if (strArray.length == 3) {
                        // 设置EiBlock的数据区
                        this.set(strArray[0], strArray[1], strArray[2], arguments[1]);
                    }
                }
                break;

            case 3:
                // 设置EiBlock块的属性值
                this.blocks[blockId].set(arguments[1], arguments[2]);
                break;

            case 4:
                // 设置EiBlock块cell值
                if (typeof this.blocks[blockId].getBlockMeta().getMeta(arguments[2]) == 'undefined') {
                    var column = new EiColumn(arguments[2]);

                    column.pos = this.blocks[blockId].colCount++;

                    this.blocks[blockId].getBlockMeta().addMeta(column);
                }
                this.blocks[blockId].setCell(arguments[1], arguments[2], arguments[3]);
                break;
        }
    };

    /**
     * 根据DOM元素（输入字段）的id，把其值设置到EiInfo对应的EiBlock块中
     * id按照块名、行号、列名规则，以'-'分隔 <input id='result-0-ename' name='result-0-ename'>
     * @param {String} inputId DOM的id
     */


    EiInfo.prototype.setById = function setById(inputId) {
        this.setByNameValue(inputId, _selectById(inputId).value);
    };

    /**
     * 根据id名,按照块名、行号、列名规则，以'-'分隔，设置到EiInfo中
     * @param {String} inputId  key名
     * @param {Object} value  欲设置的值
     */


    EiInfo.prototype.setByNameValue = function setByNameValue(inputId, value) {
        // let value = $.trim(oldValue);
        // 防止inputId为空
        if (Object.prototype.toString.call(inputId) === '[object String]' && !!inputId) {
            var idArray = inputId.split('-');
            if (idArray.length === 3) return this.set(idArray[0], idArray[1], idArray[2], value);
            if (idArray.length === 2) return this.set(idArray[0], idArray[1], value);
            if (idArray.length === 1) return this.set(idArray[0], value);
        }
    };

    EiInfo.prototype.toJSON = function toJSON() {
        var parser = EiInfoParserFactory.getEiInfoParser(this);
        return parser.toJSON.apply(this, arguments);
    };

    EiInfo.prototype.toJSONString = function toJSONString() {
        return JSON.stringify(this.toJSON(arguments));
    };

    EiInfo.prototype.clone = function clone() {
        return EiInfo.parseJSONObject(this.toJSON());
    };

    //20210529 胡劲华 为了将jquery剔除这里将EiInfo中针对平台页面的相关处理注释掉，后续可以等平台处理好之后，再打开
    // /**
    //  * 序列化组织form表单或者div中所有的输入字段，根据id三段式的定义，设置EiInfo的信息
    //  * DOM结点以及其包含的子结点 根据其id，设置到EiInfo中去 id按照块名、行号、列名规则，以'-'分隔
    //  * @param {String} divId    DOM结点对应的ID
    //  */


    // EiInfo.prototype.setByNode = function setByNode(divId) {
    //     this.setByNodeObject(_selectById(divId), arguments[1]);
    // };

    // /**
    //  * 遍历div中所有的input，select，textarea元素，然后将其值设置到EiInfo中
    //  * @param {Object} divNode div dom结点
    //  * @param {Boolean} force 强制序列化div中所有的输入元素，忽略输入元素上的exclude属性
    //  */


    // EiInfo.prototype.setByNodeObject = function setByNodeObject(divNode, force) {
    //     var i = void 0,
    //         node = void 0,
    //         nodes = void 0,
    //         checkboxes = {};

    //     nodes = divNode.getElementsByTagName('input');
    //     for (i = 0; i < nodes.length; i++) {
    //         node = nodes[i];
    //         if (force || !(0, _jquery2.default)(node).data('exclude')) {
    //             // node.exclude表示字段不要被序列化至EiInfo
    //             if (node.type === 'radio' && !node.checked) continue;

    //             if (node.type === 'checkbox') {
    //                 if (node.checked) {
    //                     if (checkboxes[node.name] === undefined) {
    //                         // 第一个checkbox
    //                         checkboxes[node.name] = node.value;
    //                     } else {
    //                         // 已有checkbox选中，追加选中的value，用','分隔
    //                         checkboxes[node.name] = checkboxes[node.name] + ',' + node.value;
    //                     }
    //                 }
    //                 continue;
    //             }

    //             if ((0, _jquery2.default)(node).data('role') === 'multiselect') {
    //                 // 处理多选场景 EiInfo的序列化
    //                 var value = (0, _jquery2.default)(node).data('kendoMultiSelect').value().join(',');
    //                 this.setByNameValue(node.name, value);
    //             } else {
    //                 // checked的radio input和text input，在此统一赋值
    //                 this.setByNameValue(node.name, node.value);
    //             }
    //         }
    //     }

    //     for (var name in checkboxes) {
    //         // checkbox的赋值
    //         this.setByNameValue(name, checkboxes[name]);
    //     }

    //     nodes = divNode.getElementsByTagName('select');

    //     for (i = 0; i < nodes.length; i++) {
    //         node = nodes[i];
    //         if (force || !(0, _jquery2.default)(node).data('exclude')) {
    //             if (!node.multiple) {
    //                 // 单选select
    //                 if (node.options.length > 0) if (node.selectedIndex >= 0) {
    //                     this.setByNameValue(node.name, node.options[node.selectedIndex].value);
    //                 } else {
    //                     this.setByNameValue(node.name, '');
    //                 }
    //             } else {
    //                 var val = [];
    //                 for (var j = 0; j < node.options.length; j++) {
    //                     var option = node[j];
    //                     if (option.selected === true) {
    //                         val.push(option.value);
    //                     }
    //                 }
    //                 this.setByNameValue(node.name, val.join(','));
    //             }
    //         }
    //     }

    //     nodes = divNode.getElementsByTagName('textarea');
    //     for (i = 0; i < nodes.length; i++) {
    //         node = nodes[i];
    //         if (force || !(0, _jquery2.default)(node).data('exclude')) {
    //             this.setByNameValue(node.name, node.value);
    //         }
    //     }
    // };

    // /**
    //  *
    //  * 遍历结点内所有的input，select，textarea元素，快速构建出EiInfo
    //  * @param {Mixed} node jQuery selector字符串，jQuery对象，DOM对象
    //  */


    // EiInfo.build = function build(node) {
    //     var info = new EiInfo('');
    //     if ((0, _jquery2.default)(node)[0]) {
    //         // 需要序列化的DOM结点必须存在
    //         info.setByNodeObject((0, _jquery2.default)(node)[0]);
    //     }
    //     return info;
    // };

    /**
     * 解析JSON对象中的EiInfo信息 JSON ==> EiInfo
     * @param {Object} eiJSON 包含EiInfo信息的JSON对象
     * @return {EiInfo} JSON对象解析成的EiInfo
     */


    EiInfo.parseJSONObject = function parseJSONObject(eiJSON) {
        var parser = EiInfoParserFactory.getEiInfoParser(eiJSON);
        return parser.parseJSON.call(this, eiJSON);
    };

    EiInfo.parseJSONString = function parseJSONString(jsonString) {
        return EiInfo.parseJSONObject(JSON.parse(jsonString));
    };

    return EiInfo;
}(AbstractEi);

// form表单由于历史原因，input只写了name属性，没有提供id属性
// 平台的规范是需要id和name同时设置, _selectById == ef.get


function _selectById(id) {
    var node = document.getElementById(id);
    if (!node) {
        var nodeList = document.getElementsByName(id);
        if (nodeList.length > 0) node = nodeList[0];
    }
    return node;
}

EiColumn.prototype.__ClassName__ = 'EiColumn';
EiBlockMeta.prototype.__ClassName__ = 'EiBlockMeta';
EiBlock.prototype.__ClassName__ = 'EiBlock';
EiInfo.prototype.__ClassName__ = 'EiInfo';

var SysInfo = function SysInfo() {
    _classCallCheck(this, SysInfo);

    this.CompanyCode = '';
    this.CompanyName = '';
    this.SvcName = '';
    this.Msg = '';
    this.Flag = 0;
    this.Sender = '';
    this.UserName = '';
    this.ForeIP = '';
    this.ForeMac = '';
    this.UUID = '';
};

/**
 * 获取EiInfo解析器的工厂方法
 */


var EiInfoParserFactory = {
    getEiInfoParser: function getEiInfoParser(eiInfo) {
        if (eiInfo[EiInfoJsonConstants.VERSION] === '2.0') {
            return EiInfoParser.V2;
        }

        return EiInfoParser.V1;
    }
};

/**
 * 不同版本的EiInfo解析器
 */
var EiInfoParser = {
    V1: {
        toJSON: function toJSON() {
            var eiInfo = {},
                that = this;

            eiInfo[EiInfoJsonConstants.EIINFO_NAME] = that.getName();
            eiInfo[EiInfoJsonConstants.EIINFO_DESC_NAME] = that.getDescName();
            eiInfo[EiInfoJsonConstants.EIINFO_MESSAGE] = that.getMsg();
            eiInfo[EiInfoJsonConstants.EIINFO_MESSAGE_KEY] = that.getMsgKey();
            eiInfo[EiInfoJsonConstants.EIINFO_DETAIL_MESSAGE] = that.getDetailMsg();
            eiInfo[EiInfoJsonConstants.EIINFO_STATUS] = that.getStatus();

            eiInfo[EiInfoJsonConstants.ATTRIBUTES] = that.getAttr();

            // 处理blocks
            var blocks = {};

            for (var blockId in this.getBlocks()) {
                blocks[blockId] = this.getBlock(blockId).toJSON(arguments); // EiBlock ==> JSON
            }

            eiInfo[EiInfoJsonConstants.EIINFO_BLOCKS] = blocks; // {blocks: {result: {}, inqu_status: {}}}

            return eiInfo;
        },
        parseJSON: function parseJSON(eiJSON) {
            var eiInfo = new EiInfo('');
            // new EiInfo自动创建了version属性，2.0以前的EiInfo无此属性
            delete eiInfo[EiInfoJsonConstants.VERSION];

            var value = eiJSON[EiInfoJsonConstants.EIINFO_NAME];
            if (isAvailable(value)) {
                eiInfo.setName(value);
            }

            value = eiJSON[EiInfoJsonConstants.EIINFO_DESC_NAME];
            if (isAvailable(value)) {
                eiInfo.setDescName(value);
            }

            value = eiJSON[EiInfoJsonConstants.EIINFO_MESSAGE];
            if (isAvailable(value)) {
                eiInfo.setMsg(value);
            }

            value = eiJSON[EiInfoJsonConstants.EIINFO_MESSAGE_KEY];
            if (isAvailable(value)) {
                eiInfo.setMsgKey(value);
            }

            value = eiJSON[EiInfoJsonConstants.EIINFO_DETAIL_MESSAGE];
            if (isAvailable(value)) {
                eiInfo.setDetailMsg(value);
            }

            value = eiJSON[EiInfoJsonConstants.EIINFO_STATUS];
            if (isAvailable(value)) {
                eiInfo.setStatus(value);
            }

            value = eiJSON[EiInfoJsonConstants.ATTRIBUTES];
            if (isAvailable(value)) {
                eiInfo.setAttr(value);
            }

            value = eiJSON[EiInfoJsonConstants.EIINFO_BLOCKS];
            if (isAvailable(value)) {
                for (var blockId in value) {
                    var block = EiBlock.parseBlock(blockId, value[blockId]);
                    eiInfo.addBlock(block);
                }
            }
            return eiInfo;
        }
    },
    V2: {
        toJSON: function toJSON() {
            var that = this,

                // 防止污染 attr
                // eiInfo = _jquery2.default.extend(true, {}, that.getAttr()); // EiInfo的扩展属性区作为新格式的主要内容
            eiInfo = lodash.cloneDeep(that.getAttr());
            eiInfo[EiInfoJsonConstants.VERSION] = '2.0'; // 版本号

            var sysJSON = eiInfo[EiInfoJsonConstants.SYS] = {}; // EiInfo的标准属性区

            sysJSON[EiInfoJsonConstants.EIINFO_NAME] = that.getName();
            sysJSON[EiInfoJsonConstants.EIINFO_DESC_NAME] = that.getDescName();
            sysJSON[EiInfoJsonConstants.EIINFO_MESSAGE] = that.getMsg();
            sysJSON[EiInfoJsonConstants.EIINFO_MESSAGE_KEY] = that.getMsgKey();
            sysJSON[EiInfoJsonConstants.EIINFO_DETAIL_MESSAGE] = that.getDetailMsg();
            sysJSON[EiInfoJsonConstants.EIINFO_STATUS] = that.getStatus();
            sysJSON[EiInfoJsonConstants.EIINFO_TRACE_ID] = that.traceId || '';

            // 处理blocks
            var blocks = {};
            for (var blockId in that.getBlocks()) {
                blocks[blockId] = that.getBlock(blockId).toJSON(arguments); // EiBlock ==> JSON
            }
            eiInfo[EiInfoJsonConstants.BLOCKS] = blocks; // {blocks: {result: {}, inqu_status: {}}}

            // 调用链路相关的context
            // eiInfo[EiInfoJsonConstants.CONTEXT] = $.extend({}, that.__context__);

            return eiInfo;
        },
        parseJSON: function parseJSON(eiJSON) {
            var eiInfo = new EiInfo(''),
                sysJSON = eiJSON[EiInfoJsonConstants.SYS],
                // EiInfo的标准属性区
                value = void 0;

            eiInfo[EiInfoJsonConstants.VERSION] = '2.0'; // 版本

            value = sysJSON[EiInfoJsonConstants.EIINFO_NAME];
            if (isAvailable(value)) {
                eiInfo.setName(value);
            }

            value = sysJSON[EiInfoJsonConstants.EIINFO_DESC_NAME];
            if (isAvailable(value)) {
                eiInfo.setDescName(value);
            }

            value = sysJSON[EiInfoJsonConstants.EIINFO_MESSAGE];
            if (isAvailable(value)) {
                eiInfo.setMsg(value);
            }

            value = sysJSON[EiInfoJsonConstants.EIINFO_MESSAGE_KEY];
            if (isAvailable(value)) {
                eiInfo.setMsgKey(value);
            }

            value = sysJSON[EiInfoJsonConstants.EIINFO_DETAIL_MESSAGE];
            if (isAvailable(value)) {
                eiInfo.setDetailMsg(value);
            }

            value = sysJSON[EiInfoJsonConstants.EIINFO_STATUS];
            if (isAvailable(value)) {
                eiInfo.setStatus(value);
            }

            // traceId 的加入
            value = sysJSON[EiInfoJsonConstants.EIINFO_TRACE_ID];
            if (value) {
                eiInfo.traceId = value;
            }

            // context的处理
            // value = eiJSON[EiInfoJsonConstants.CONTEXT];
            // if (isAvailable(value)) {
            //     eiInfo[EiInfoJsonConstants.CONTEXT] = value;
            // }


            // blocks区域处理
            value = eiJSON[EiInfoJsonConstants.BLOCKS];
            if (isAvailable(value)) {
                for (var blockId in value) {
                    var block = EiBlock.parseBlock(blockId, value[blockId]);
                    eiInfo.addBlock(block);
                }
            }

            // var json = _jquery2.default.extend({}, eiJSON);
            var json = lodash.cloneDeep(eiJSON);
            delete json[EiInfoJsonConstants.SYS];
            delete json[EiInfoJsonConstants.VERSION];
            // delete json[EiInfoJsonConstants.CONTEXT];
            delete json[EiInfoJsonConstants.BLOCKS];

            // 顶层的JSON挪动到扩展属性区
            value = json;
            if (isAvailable(value)) {
                eiInfo.setAttr(value);
            }

            return eiInfo;
        }
    },
    C4: {}
};

/* EiInfo转换时的常量定义 */
var EiInfoJsonConstants = {
    ATTRIBUTES: 'attr',

    EIINFO_NAME: 'name',
    EIINFO_DESC_NAME: 'descName',
    EIINFO_MESSAGE: 'msg',
    EIINFO_MESSAGE_KEY: 'msgKey',
    EIINFO_DETAIL_MESSAGE: 'detailMsg',
    EIINFO_STATUS: 'status',
    EIINFO_TRACE_ID: 'traceId', // 调用链路的traceId 在SYS区域

    EIINFO_BLOCKS: 'blocks',
    BLOCK_META: 'meta',
    BLOCK_META_DESC: 'desc',
    BLOCK_META_COLUMNLIST: 'columns',
    BLOCK_META_COLUMNPOS: 'columnPos',
    BLOCK_DATA: 'rows',

    SYS: '__sys__',
    BLOCKS: '__blocks__',
    VERSION: '__version__',
    CONTEXT: '__context__' // REST调用上下文
};

// iPlat4J 前后台交互使用的变量名
var EiConstant = {
    EF_FORM_ENAME: 'efFormEname',
    EF_FORM_CNAME: 'efFormCname',
    EF_FORM_POPUP: 'efFormPopup',
    EF_CUR_FORM_ENAME: 'efCurFormEname', // 发起请求的当前页面号，可能与efFormEname相同，特殊情况，可能不同
    EF_FORM_LOAD_PATH: 'efFormLoadPath',
    EF_FORM_STYLE: 'efFormStyle',
    EF_FORM_INFO_TAG: 'efFormInfoTag',
    EF_FORM_BUTTON_DESC: 'efFormButtonDesc',
    EF_CUR_BUTTON_ENAME: 'efCurButtonEname', // 用户当前点击的按钮名称

    SERVICE_NAME: 'serviceName',
    METHOD_NAME: 'methodName',
    STATUS: 'status',
    SQL_NAME: 'sqlName',

    EI: 'ei',
    EIINFO: 'eiinfo',

    SHOW_MSG: 'efShowMsg', // 控制前端是否显示通知消息
    SHOW_DETAIL_MSG: 'efShowDetailMsg', // 控制前端是否显示详细的通知消息
    SHOW_MSG_KEY: 'efShowMsgKey',

    LIMIT: 'limit', // pageSize
    OFFSET: 'offset', // page, take, skip
    COUNT: 'count',
    SHOW_COUNT: 'showCount', // 后台是否进行count操作
    ORDER_BY: 'orderBy',
    COLUMN_TOTAL_SUM: 'columnTotalSum' // 后台总计信息返回
};

// exports.EiColumn = EiColumn;
// exports.EiBlockMeta = EiBlockMeta;
// exports.EiBlock = EiBlock;
// exports.EiInfo = EiInfo;
// exports.EiConstant = EiConstant;
// exports.SysInfo = SysInfo;

export {
    EiColumn,
    EiBlockMeta,
    EiBlock,
    EiInfo,
    SysInfo,
    EiConstant,
};