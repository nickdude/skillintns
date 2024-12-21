import React from 'react';
import Styles from '../styles/questionMetaData.module.css';

const Breadcrumb = ({ breadcrumbLinks }) => {
    return (
        <div className={Styles.linkContainer}>
            <img src="/arrowLeft.svg" alt="Go Back" />
            <div className={Styles.breadcrumbLinks}>
                {breadcrumbLinks.map((link, index) => (
                    <React.Fragment key={index}>
                        <a className={Styles.greenLink} href={link.href}>
                            {link.text}
                        </a>
                        {index < breadcrumbLinks.length - 1 && <p>/</p>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Breadcrumb;