import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";

export const useAllDataTest = (urls) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { dispatch,currentPage,pageSize } = useAppContext();

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const requests = urls.map(async (url) => {
                    if (url === process.env.REACT_APP_SALE_URL_API) {
                        var res = await axios.get(
                            `${url}/?PageNumber=${currentPage}&PageSize=${pageSize}`
                        );
                        var pagination = JSON.parse(res.headers.pagination);
                        dispatch({
                            type: "PAGINATION",
                            payload: pagination.totalPages,
                        });
                    } else {
                        res = await axios.get(url);

                        if (res.status !== 200) {
                            throw new Error(
                                `Request failed with status: ${res.status}`
                            );
                        }
                    }
                    return res.data;
                });

                const results = await Promise.all(requests);
                console.log(results);
                dispatch({
                    type: "GET_ALL_DATA",
                    payload: {
                        customerData: results[0],
                        productData: results[1],
                        storeData: results[2],
                        saleData: results[3],
                    },
                });

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
    }, [currentPage]);

    return { isPending, error };
};
