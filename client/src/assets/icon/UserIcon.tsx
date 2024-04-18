
const UserIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
        >
            <path
                stroke="currentColor"
                d="M12 2c3.313 0 6 2.687 6 6s-2.687 6-6 6-6-2.687-6-6 2.687-6 6-6z"
            />
            <path
                stroke="currentColor"
                d="M19 22c1.104 0 2-.896 2-2s-.896-2-2-2h-1c-3.364 0-6.241-2.193-7-5-.759 2.807-3.636 5-7 5H5c-1.104 0-2 .896-2 2s.896 2 2 2h14z"
            />
        </svg>
    );
};

export default UserIcon;
