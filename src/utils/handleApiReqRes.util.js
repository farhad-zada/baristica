
/**
 * 
 * @param {Promise<any>} req 
 */
export const handleApiReqRes = async (req) => {
    const res = await req;
    if (req.status > 400) {
        throw new Error(res.data?.message || "Service is down. Please contact us!");
    }
    return res;
}