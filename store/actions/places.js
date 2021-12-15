export const DELETE_STORE = 'DELETE_STORE';

export const deleteStore = id => {
    return {
        type: DELETE_STORE,
        storeId: id,
    };
};
