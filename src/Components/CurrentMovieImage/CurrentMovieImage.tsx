import React from 'react';

interface ICurrentMovieImage {
    image: string;
}

const CurrentMovieImage = ({ image }: ICurrentMovieImage) => {
    return (
        <>
            <img src={image} alt={image} />
        </>
    )
}

export default CurrentMovieImage;
