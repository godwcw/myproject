export default function setCookie(name,value,min){
    let val = escape(value)
    if(min){
        let date = new Date()
        date.setTime(date.getTime() + 1000 * 60 * min) 
        document.cookie = `${name} = ${val};expires =${date.toUTCString()}`
    }else{
        document.cookie = `${name} = ${val}`
    }
}