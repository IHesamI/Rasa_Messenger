import { useSelector } from "react-redux"
function lang_(lang){
return JSON.parse(localStorage.getItem(lang))
}
export function uselang(key){
    const lang=useSelector(state=>state.profile.lang);
    return lang_(lang)[key]
}
