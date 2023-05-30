import React from "react";
import car from "src/resource/img/car.svg";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
}

export const CustomImg: React.FC<CustomImageProps> = ({ src, alt, ...props }) => {
    return (
        <img
            src={src}
            alt={alt}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = car;
            }}
            {...props}
        />
    );
};
