let m, n;

const fieldsResponseInit = (missingFields, newFields) => {
    m = missingFields;
    n = newFields;
};

const fieldsResponse = () => {
    const missingFieldsResponse = m?.length ? `Missing fields in JSON (${m}); ` : m;
    const newFieldsResponse = n?.length ? `Unrecognized fields in JSON (${n}); ` : n;
    m = n = null;
    return `${missingFieldsResponse || ''}${newFieldsResponse || ''}`;
};

export { fieldsResponseInit, fieldsResponse };
