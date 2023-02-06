export const updateObjectInArray = (items:any, itemId:any, itemPropName:any, newObjectProps:any) => {
    return items.map((u : any) => {
        if (u[itemPropName] === itemId) {
            return { ...u, ...newObjectProps}
        }
        return u;
    })
}

