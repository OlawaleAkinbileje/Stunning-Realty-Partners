import React from 'react';

type IconProps = {
    name: string;
    className?: string;
    variant?: 'solid' | 'regular';
};

const Icon: React.FC<IconProps> = ({ name, className = '', variant = 'solid' }) => {
    const cn = className;
    const common: React.SVGProps<SVGSVGElement> = {
        width: '1em',
        height: '1em',
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        className: cn,
    };

    switch (name) {
        case 'star':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z" />
                </svg>
            );
        case 'search':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            );
        case 'network-wired':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                    <circle cx="18" cy="6" r="2" fill="currentColor" />
                    <circle cx="12" cy="18" r="2" fill="currentColor" />
                    <path d="M8 8l4 6 4-6" />
                </svg>
            );
        case 'long-arrow-alt-right':
            return (
                <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            );
        case 'long-arrow-alt-left':
            return (
                <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
            );
        case 'users-cog':
        case 'users':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3zM6 13c-2.33 0-7 1.17-7 3.5V20h14v-3.5C13 14.17 8.33 13 6 13zM16 13c-.29 0-.62.02-.98.05 1.16.84 1.98 2.05 1.98 3.45V20h6v-3.5c0-2.33-4.67-3.5-6-3.5z" />
                </svg>
            );
        case 'dollar-sign':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 1v22" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6" />
                </svg>
            );
        case 'user-graduate':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
                    <path d="M12 13a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            );
        case 'eye':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );
        case 'eye-slash':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-7-11-7a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 7 11 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            );
        case 'gem':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 7l10 13L22 7 12 2 2 7z" />
                </svg>
            );
        case 'chart-line':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="3 17 9 11 13 15 21 7" />
                    <polyline points="21 7 21 17 3 17" />
                </svg>
            );
        case 'handshake':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 12l6 6 4-4 8 8 2-2-8-8-4 4-6-6-2 2z" />
                </svg>
            );
        case 'heart':
            if (variant === 'regular') {
                return (
                    <svg {...common} stroke="currentColor" strokeWidth={2} fill="none" viewBox="0 0 24 24">
                        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                    </svg>
                );
            }
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21s-7-4.35-9.2-6.48A5.5 5.5 0 0112 3a5.5 5.5 0 019.2 11.52C19 16.65 12 21 12 21z" />
                </svg>
            );
        case 'map-marker-alt':
        case 'map-marker':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8 2 5 5.03 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.97-3-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                </svg>
            );
        case 'location-arrow':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 3L11 13" />
                    <path d="M21 3l-6 18 2-7 7-7z" />
                </svg>
            );
        case 'user':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0H2z" />
                </svg>
            );
        case 'edit':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
            );
        case 'clock':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            );
        case 'chart-line':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
            );
        case 'user-graduate':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9.59l1.63-.89L12 13l6.48-3.53 1.63.89L12 14.07 3.89 9.59zM12 15l-9-4.91V17c0 1.66 4.03 3 9 3s9-1.34 9-3v-6.91L12 15z" />
                </svg>
            );
        case 'filter':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
            );
        case 'dollar-sign':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
            );
        case 'trash-alt':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                </svg>
            );
        case 'filter':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 3H2l8 9v7l4 2v-9l8-9z" />
                </svg>
            );
        case 'phone-alt':
        case 'phone':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 16.92V21a1 1 0 01-1.11.99C10.39 21 3 13.61 2.01 3.11A1 1 0 013 2h4.09a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.25 1l-1.2 1.2a11 11 0 005.9 5.9l1.2-1.2a1 1 0 011-.25l3.6 1.2a1 1 0 01.68.95z" />
                </svg>
            );
        case 'envelope':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16v16H4z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            );
        case 'briefcase':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 7V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2" />
                </svg>
            );
        case 'search-plus':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            );
        case 'user-tie':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12l3 5-1 5H10l-1-5 3-5zM12 2a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            );
        case 'rocket':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2s4 1 6 3 3 6 3 6-1 4-3 6-6 3-6 3-4-1-6-3-3-6-3-6 1-4 3-6 6-3 6-3z" />
                </svg>
            );
        case 'facebook-f':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.2h-1.1c-1.08 0-1.42.67-1.42 1.36v1.64h2.42l-.39 2.9h-2.03v7A10 10 0 0022 12z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="3.2" fill="#fff" />
                </svg>
            );
        case 'linkedin-in':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v14H0zM8 8h4.8v1.9h.1c.7-1.3 2.4-2.7 4.9-2.7C22 7.2 24 9.1 24 13.1V22H19v-7.2c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V22H8V8z" />
                </svg>
            );
        case 'bars':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            );
        case 'times':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            );
        case 'bed':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="10" rx="2" />
                    <path d="M2 13h20" />
                </svg>
            );
        case 'bath':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M7 21v-4a4 4 0 018 0v4" />
                    <path d="M5 7h14v6H5z" />
                </svg>
            );
        case 'vector-square':
            return (
                <svg {...common} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" />
                    <path d="M7 7h10v10H7z" />
                </svg>
            );
        case 'handshake':
            return (
                <svg {...common} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 11.23V21h8v-3.5c0-1.38-1.12-2.5-2.5-2.5h-1v-2.77L0 11.23zM24 11.23V21h-8v-3.5c0-1.38 1.12-2.5 2.5-2.5h1v-2.77l4.5-1zM12 2C8.13 2 5 5.13 5 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" />
                </svg>
            );
        default:
            return <svg {...common} />;
    }
};

export default Icon;
