import React from 'react';
import { twMerge } from '@uniwebcms/module-sdk';

export default function ({ as: Component = 'section', children, className = '', ...rest }) {
    return (
        <Component className={twMerge('py-12 lg:py-24 relative', className)} {...rest}>
            {children}
        </Component>
    );
}
