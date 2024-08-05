import React from 'react';
import { Link } from "@uniwebcms/module-sdk"

export default function Parser({text}) {
    console.log(text)
    switch (text.type) {
        case 'paragraph':
            return <p>{text.content.map((part) => {
                const { marks } = part;
                if (marks === undefined) {
                    return part.text
                } else if (marks[0].type === 'code') {
                    return <code className='font-semibold'>
                        `
                        {part.text}
                        `
                        </code>
                } else {
                    let isBold = marks.find((mark) => mark.type === 'bold');
                    let isItalic = marks.find((mark) => mark.type === 'italic');

                    let linkHref = marks.filter((mark) => mark.type === 'link')?.[0]?.attrs?.href;

                    let text = part.text;

                    text = isItalic ? <em>{text}</em> : text;
                    text = isBold ? <strong>{text}</strong> : text;
                    text = linkHref ? <Link href={linkHref} className='font-semibold'>{text}</Link> : text;
                    return text;
                }
            })}</p>
        default:
            return
    }
}