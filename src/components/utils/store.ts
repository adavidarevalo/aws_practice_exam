import store from "store";

export const toggleStore = (type: string, id: string, storeKey: string) => {
    const data = store.get(storeKey)
    if (data?.find((exam: {
        type: string;
        id: string;
    }) => exam.type === type && exam.id === id)) {

        store.set(storeKey, data.filter((exam: {
            type: string;
            id: string;
        }) => JSON.stringify(exam) !== JSON.stringify({ type, id })))

        return
    }
    store.set(storeKey, [...(data || []), { type, id }])
}

export const gerStore = (storeKey: string) => {
    return store.get(storeKey)
}