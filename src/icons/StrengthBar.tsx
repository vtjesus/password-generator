export function StrengthBar({strength} : {strength:number}) {
    return (<div className={`w-[10px] h-7 border-2 border-white border-solid 
    ${strength === 1 || strength < 0 ? "bg-[#F64A4A] border-none" : ""}
    ${strength === 2 ? "bg-[#FB7C58] border-none" : ""}
    ${strength === 3 ? "bg-[#F8CD65] border-none" : ""}
    ${strength >= 4 ? "bg-[#A4FFAF] border-none" : ""}`}>

    </div>)
}