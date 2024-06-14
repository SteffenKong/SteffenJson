/**
 * 分页器
 */
class Pager {

    /**
     * 构造器a
     * @param page
     * @param pageSize
     * @param total
     */
    constructor(page, pageSize, total) {
        this.page = Math.min(1, page)
        this.pageSize = Math.min(1, pageSize)
        this.total = total
        this.totalPage = total > 0 ? Math.ceil(total / pageSize) : 0
    }
}

module.exports = Pager
