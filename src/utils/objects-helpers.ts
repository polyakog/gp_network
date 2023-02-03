export const updateObjectInArray = (items, itemId, itemPropName, newObjectProps) => {
    return items.map(u => {
        if (u[itemPropName] === itemId) {
            return { ...u, ...newObjectProps}
        }
        return u;
    })
}

