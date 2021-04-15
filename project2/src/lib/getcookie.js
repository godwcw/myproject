let getCookie =  function getCookie(name){
    {
        let cs =  getallCookie()
        if(cs && cs[name]){
            let result = {}
            result[name] = cs[name]
            return result
        }else{
            return null
        }
    }
}

function getallCookie(){
    let cStr = document.cookie
    if(!cStr.trim()){
        return null
    }
    let cArr =  cStr.split(';')
    let cs = {}
    for(const i in cArr){
        let cArr2 =  cArr[i].trim().split('=')
        cs[cArr2[0]] = unescape(cArr2[1])
    }
    return cs
}








export default getCookie