const imageUrlBuilder = (mediaPath: string) => {

    const url = new URL(mediaPath);
    return url.toString();
};
export default imageUrlBuilder;
