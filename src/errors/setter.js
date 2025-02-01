const setCustomError = (errorObj, type) => ({
    name: errorObj?.name || 'UndefinedError',
    [type]: setProperty(errorObj, type) || '[]'
});

const setProperty = (errorObj, type) => {
    switch (type) {
        case 'content':
            return `${new Date().toLocaleString()
                }\n${errorObj?.stack
                }\ncontent: ${JSON.stringify(errorObj, null, '    ')
                }`;
        case 'data':
            return JSON.stringify(errorObj?.data, null, '    ');
        default:
            return JSON.stringify(errorObj, null, '    ');
    }
};

export { setCustomError };
