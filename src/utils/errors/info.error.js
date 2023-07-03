export const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * title: needs to be a String, received ${product.title}
    * code: needs to be a String, received ${product.code} 
    * price: needs to be a Number, received ${product.price}
    `
}

export const generateParamErrorInfo = (cid, pid) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * cid: needs to be a String with 24 chars, received ${cid.length}
    * pid: needs to be a String with 24 chars, received ${pid.length} 
    `
}

export const generateCartErrorInfo = (cid) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * cid: needs to be a String with 24 chars, received ${cid.length}
    `
}
