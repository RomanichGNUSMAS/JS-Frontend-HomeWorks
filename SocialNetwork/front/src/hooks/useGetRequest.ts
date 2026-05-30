import React, { useCallback } from "react";
import { Axios } from "../config/Axios";

interface returnData<R> {
    loading: boolean
    refetch: () => void
    data: R | null
}
export const useGetRequest = <T>(path: string): returnData<T> => {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(true)
    const refetch = useCallback(() => {
        Axios.get<T>(path)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.error(err.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [path])


    React.useEffect(() => {
        refetch();
    }, [refetch])

    return { data,loading,refetch }
}