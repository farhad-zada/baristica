
/**
 * 
 * @param {Promise<any>} req 
 */
export const handleApiReqRes = async (req) => {
    try {
        const res = await req;
        return res;
    } catch (error) {
        console.log("ERROR: ", error);
        throw new Error(error.response.data?.message || "Service is down. Please contact us!");
    }
}