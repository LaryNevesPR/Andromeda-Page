import React, { ReactNode } from 'react';

interface StatusBoxProps {
    title: ReactNode;
    content: ReactNode;
    className?: string;
}

/* É usado para as informações na direita da págia. Simples e funciona */
const StatusBox: React.FC<StatusBoxProps> = ({ title, content, className = '' }) => {
    return (
        <div className={`status ${className}`}>
            <div style={{ fontWeight: 700 }}>
                {title}
            </div>

            <div className="small" style={{ marginTop: 8 }}>
                {content}
            </div>
        </div>
    );
};

export default StatusBox;