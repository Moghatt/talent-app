import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useEditData = (url,titleName) => {
  // console.log(`outside edit ${url}`);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const editData = async (data) => {

        setIsPending(true);
        console.log({url,data})

        try {
            const res = await axios.put(url, data);

            if (res.status !== 200) {
                throw new Error(`Request failed with status: ${res.status}`);
            }
            setError(null);
            toast.success(`${titleName} Successfully Updated!`);
        } catch (err) {
            setError(err);
        } finally {
            setIsPending(false);
        }
    };

    return { editData, isPending, error };
};
