const Event = {
    listeners: [],
    emit: (name, ...data) => {
        Event.listeners.forEach(L => {
            if (L.name === name) {
                L.fn(...data);
            }
        })
    },
    on: (name, fn) => {
        Event.listeners.push({ name, fn });
    }
};

export default Event;