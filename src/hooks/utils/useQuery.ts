import {useEffect, useRef, useState} from "react";

type QueryStatus = 'pending' | 'loading' | 'success'

type QueryFnParams = {
    signal?: AbortSignal
}

type Params<T> = {
    queryFn: (params: QueryFnParams) => Promise<T>
    enabled?: boolean
    queryKey: Array<string | number | null>
}

export function useQuery<T>({queryFn, enabled = true, queryKey}: Params<T>) {
    const [status, setStatus] = useState<QueryStatus>('loading')
    const [data, setData] = useState<T | null>(null)

    const abortController = useRef<AbortController>(null)

    useEffect(() => {
        abortController.current?.abort()
        if (queryKey.some(k => k === null)) {
            setData(null)
            setStatus('pending')
            return
        }

        if (!enabled) return

        setStatus('loading')

        abortController.current = new AbortController()

        queryFn({signal: abortController.current.signal}).then(
            (json) => {
                setData(json)
                setStatus('success')
            }
        )
    }, queryKey);

    return {status, data}

}