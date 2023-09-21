import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useDeleteData = (url, titleName) => {
  
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async () => {
        setIsPending(true);
      

        try {
           await axios.delete(url);
            setError(null);

            toast.success(`${titleName} Successfully Deleted!`);
        } catch (err) {
            setError(err);
        } finally {
            setIsPending(false);
        }
    };

    return { deleteData, isPending, error };
};
