import React from 'react';

const Comment = ({comment}) => {
    return (
        <div className='border border-primary/40 p-5 mb-2 border-t-0 shadow-sm shadow-primary bg-accent/5 text-primary'>
            
            <p>{comment.comment}</p>
        </div>
    );
};

export default Comment;