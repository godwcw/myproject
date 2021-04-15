export default function ajax(reqData) {
    return new Promise((resolve, reject) => {
        let method = reqData.method
        let url = reqData.url
        if (!url) {
            reject({ state: "URL is NULL" })
        }
        if (!method) {
            method = 'get'
        }
        method = method.trim().toUpperCase()
        url = url.trim()

        let xhr = new XMLHttpRequest()
        let fd = null
        if (reqData.data) {
            if ('GET' === method) {
                url += '?'
                for (const key in reqData.data) {
                    url += `${key}=${reqData.data[key]}&`
                }
            } else if ('POST' === method) {
                fd = new FormData()
                for (const key in reqData.data) {
                    fd.append(key, reqData.data[key])
                }
            }
        }

        xhr.open(method, url)
        if (reqData.timeout) {
            xhr.timeout = reqData.timeout
        }

        xhr.send(fd)

        xhr.onreadystatechange = function () {
            if (4 === this.readyState && 200 === this.status) {
                let  res = ''
                try {
                    res =  JSON.parse(this.responseText)
                } catch (error) {
                    res = this.responseText
                }
                resolve(res)
                
            }
        }
    })
}