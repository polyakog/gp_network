export const updateObjectInArray = (item, itemPropName, itemId, newObjectProps) => {
    item.map(u => {
        if (u[itemPropName] === itemId) {
            return { ...u, newObjectProps}
        }
        return u;
    })
}

