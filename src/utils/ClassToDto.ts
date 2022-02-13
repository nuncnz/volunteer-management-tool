
const classToDto = (classInstance: any) : object => {

    return JSON.parse(JSON.stringify(classInstance))


}

export default classToDto