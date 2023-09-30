import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useCreateData = (url, titleName) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const createData = async (data) => {
        setIsPending(true);

        try {
            const res = await axios.post(url, data);
            console.log(res);

            if (res.status !== 201) {
                throw new Error(`Request failed with status: ${res.status}`);
            }
            setError(null);
            toast.success(`${titleName} Successfully Added!`);
        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setIsPending(false);
        }
    };

    return { createData, isPending, error };
};
