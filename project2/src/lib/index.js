export default 

cookie = {}
cookie.get = function( name ){
    // console.log( document.cookie )
    let cs =  this.getAll()
    if(cs && cs[name]){
        let result = {}
        result[name] = cs[name]
        return result
    }else{
        return null
    }
}
cookie.getAll = function(){
    let cStr = document.cookie
    if(!cStr.trim()){
        return null
    }
    cArr =  cStr.split(';')
    let cs = {}
    for(const i in cArr){
        let cArr2 =  cArr[i].trim().split('=')
        // console.log( cArr2[0], unescape(cArr2[1]))
        cs[cArr2[0]] = unescape(cArr2[1])
    }

    return cs
}
/*
    设置cookie
    1. 数据名称
    2。 数据内容
    3. 过期时间，可选的
*/
cookie.set = function(name, value, m) {
    //将存储的内容进行编码
    let va = escape(value)
    if (m) {
        // 设置过期时间
        let date = new Date()
        date.setTime(date.getTime() + 1000 * 60 * m)
        document.cookie = `${name}=${va};expires=${date.toUTCString()}`
    }else{
        document.cookie = `${name}=${va}` 
    }
}

