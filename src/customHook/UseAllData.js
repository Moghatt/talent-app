import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";

export const useAllData = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { dispatch } = useAppContext();

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                console.log(res.data);

                //  setPagination(JSON.parse(res.headers.pagination));
                var pagination = JSON.parse(res.headers.pagination);

                dispatch({
                    type: "PAGINATION",
                    payload: pagination.totalPages,
                });
                if (res.status !== 200) {
                    throw new Error(
                        `Request failed with status: ${res.status}`
                    );
                }
                setData(res.data);
                setError(null);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("The fetch was aborted");
                } else {
                    setError(err);
                }
            } finally {
                setIsPending(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, isPending, error };
};
