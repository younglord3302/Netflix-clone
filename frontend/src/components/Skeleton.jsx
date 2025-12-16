export const Skeleton = ({ className }) => {
    return (
        <div
            className={`bg-gray-800 animate-pulse rounded ${className}`}
        ></div>
    );
};
