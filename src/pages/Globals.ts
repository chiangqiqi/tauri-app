/**
 * @apiDefine ResSuccess
 * @apiSuccess {Boolean} success true.
 * @apiSuccess {Number} code 0
 * @apiSuccess {String} errMsg 空字符串
 * @apiSuccess {Object} data 返回数据.
 */
function success(data):ResponseJson {
    return {
        success: true,
        code: 0,
        msg: '',
        data: data
    }
}

function successInfo(code = 1, msg = '', data = null) : ResponseJson {
    return {
        success: true,
        code,
        msg,
        data
    }
}

/**
 * @apiDefine ResFailed
 * @apiError {Boolean} success 接口失败状态.
 * @apiError {Number} code -1
 * @apiError {String} errMsg 错误描述.
 * @apiError {Object} data null.
 */
function failed(code = -1, msg = '', data = null) : ResponseJson {
    return {
        success: false,
        code,
        msg,
        data
    }
}

global.ResData = {
    success,
    failed,
    successInfo,
}

global.wx = {
    access_token: '',
    jsapi_ticket : '',
    time: 0,
}
