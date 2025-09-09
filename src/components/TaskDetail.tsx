import {api} from "../api";
import {useQuery} from "../hooks/utils/useQuery";

type Props = {
    taskId: string | null
    boardId: string | null
};

export const TaskDetail = ({taskId, boardId}: Props) => {

    const {status, data} = useQuery({
        queryFn: ({signal}) => api.getTask(taskId!, boardId!, signal).then(res => res.data),
        enabled: !!taskId,
        queryKey: ['task', taskId]
    })

    if (!taskId) {
        return <span>Not task for display</span>
    }

    if (status === 'loading') {
        return <div>Loading...</div>
    }

        return (
            <div>
                <h2>Detail</h2>
                <h4>{data?.attributes.title}</h4>
                <div>Date: {new Date(data?.attributes.addedAt).toLocaleString()}</div>
            </div>
        );
    }