/** utility function to check null or undefined */
export const isNullOrUndefined = (value: any) => value === null || value === undefined;

/** check url is image url or not */
export const isImageUrl = (url: string) => {
    return fetch(url, { method: "HEAD" })
        .then(response => {
            let contentType = response.headers.get("Content-Type");
            if (contentType.match("image/*")) {
                return true;
            }
            return false;
        })
        .catch(error => {
            return false;
        });
};
