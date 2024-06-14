const Pager = require('./Pager')
const { CODE_SUCCESS, CODE_ERROR } = require('../src/ResultCode')

/**
 * 通用JSON构造和输出工具
 */
class Result {

    /**
     * 设置业务状态码
     * @param code
     * @returns {Result}
     */
    code(code) {
        this.statusCode = code
        return this
    }

    /**
     * 设置提示信息
     * @param message
     * @returns {Result}
     */
    message(message = '') {
        this.msg = message
        return this
    }

    /**
     * 设置数据项
     * @param item
     * @returns {Result}
     */
    item(item = {}) {
        this.itemData = item
        return this
    }

    /**
     * 设置数据集
     * @param data
     * @returns {Result}
     */
    data(data = []) {
        this.items = data
        return this
    }

    /**
     * 设置额外数据集
     * @param extra
     * @returns {Result}
     */
    extra(extra = []) {
        this.extraData = extra
        return this
    }

    /**
     * 设置分页器
     * @param page
     * @param pageSize
     * @param total
     * @returns {Result}
     */
    setPager(page, pageSize, total) {
        this.pagerObject = new Pager(page, pageSize, total)
        return this
    }

    /**
     * 输出分页信息
     * @param page
     * @param pageSize
     * @param total
     * @param data
     * @returns {Result}
     */
    static pager(page, pageSize, total, data = []) {
        return (new Result())
            .message(CODE_SUCCESS.message)
            .code(CODE_SUCCESS.code)
            .setPager(page, pageSize, total)
            .data(data)
    }

    /**
     * 输出成功的信息
     * @returns {Result}
     */
    static ok() {
        return (new Result()).message(CODE_SUCCESS.message).code(CODE_SUCCESS.code)
    }

    /**
     * 输出失败的信息
     * @returns {Result}
     */
    static error() {
        return (new Result()).message(CODE_ERROR.message).code(CODE_ERROR.code)
    }

    /**
     * 输出对象信息
     * @returns {{}}
     */
    output() {
        const buildOutput = {}
        buildOutput.code = this.statusCode
        buildOutput.message = this.msg
        buildOutput.result = buildOutput.code === CODE_SUCCESS.code
        if (this.itemData) {
            buildOutput.item = this.itemData
        }
        if (this.items) {
            buildOutput.data = this.items
        }
        if (this.extraData) {
            buildOutput.extra = this.extraData
        }
        if (this.pagerObject) {
            buildOutput.pager = {
                total: this.pagerObject.total,
                page: this.pagerObject.page,
                pageSize: this.pagerObject.pageSize,
                totalPage: this.pagerObject.totalPage
            }
        }
        return buildOutput
    }

    /**
     * 将输出的信息转为json
     * @returns {string}
     */
    toJson() {
        return JSON.stringify(this.output())
    }
}

module.exports = Result
