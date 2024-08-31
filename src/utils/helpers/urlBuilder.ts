
const urlBuilder = () => {
    const host = import.meta.env.VITE_BASE_URL;
    const url = new URL(host + '/api');
    return url.toString();
};
export default urlBuilder;
