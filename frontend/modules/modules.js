
//trim data function
export const trimData = (obj) => {
    let finalObj = {};
    for (let key in obj) {
        finalObj[key] = obj[key]?.trim().toLowerCase();
    }
    return finalObj;
}