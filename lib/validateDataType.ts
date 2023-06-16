export function validateDataType(type: string, ...variables: any[]) {
  variables.map((variable) => {
    if(typeof variable !== type) {
      throw new Error(`Invalid data type. Expected ${type}, received ${typeof variable}.`)
    }
  })
}