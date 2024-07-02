import React, {FC} from 'react';
import classNames from "classnames";

type TFeedbackModalProps = {
    data: string | string[]
    isError?: boolean
}

const FeedbackModal: FC<TFeedbackModalProps> = ({data, isError}) => {
    return (
        <div className={classNames('feedback-modal', {
            error: isError
        })}>
            {Array.isArray(data)
                ? data.map(str => <div className="text-black text-lg">{str}</div>)
                : <div className="text-black text-lg">{data}</div>
            }
        </div>
    )
}

export default FeedbackModal;