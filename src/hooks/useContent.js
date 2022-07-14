import { useState } from "react";

const useContent = () => {

    const [loading, setLoading] = useState(false);
    const [skeleton, setSkeleton] = useState(false);
    const [view, setView] = useState(false);

    return {loading,
            skeleton,
            view,
            setLoading,
            setSkeleton,
            setView}
}

export default useContent;