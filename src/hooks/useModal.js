import { useState } from "react";

const useModal = () => {
    const [visible, setVisible] = useState(false);
    const hideModal = () => {
        setVisible(false);
    }
    const showModal = () => {
        setVisible(true)
    }

    return {visible, 
            setVisible,
            hideModal,
            showModal}
}

export default useModal;