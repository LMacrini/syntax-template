// import React, { useState } from 'react';
// import { Image, docProfile } from '@uniwebcms/module-sdk';
// import './facade.css';

// const IconSVG = () => {
//     return (
//         <svg
//             xmlns='http://www.w3.org/2000/svg'
//             x='0px'
//             y='0px'
//             width='100'
//             height='100'
//             style={{ position: 'relative' }}
//             viewBox='0,0,256,256'>
//             <g
//                 fill='none'
//                 fill-rule='nonzero'
//                 stroke='none'
//                 stroke-width='1'
//                 stroke-linecap='butt'
//                 stroke-linejoin='miter'
//                 stroke-miterlimit='10'
//                 stroke-dasharray=''
//                 stroke-dashoffset='0'
//                 font-family='none'
//                 font-weight='none'
//                 font-size='none'
//                 text-anchor='none'
//                 style={{ 'mix-blend-mode': 'normal' }}>
//                 <g transform='scale(2.56,2.56)'>
//                     <path
//                         d='M50,12.5c-20.711,0 -37.5,16.789 -37.5,37.5c0,20.711 16.789,37.5 37.5,37.5c20.711,0 37.5,-16.789 37.5,-37.5c0,-20.711 -16.789,-37.5 -37.5,-37.5z'
//                         fill='#ffffff'></path>

//                     <g fill='#583993'>
//                         <path d='M39.7,68l30.6,-17l-30.6,-17z'></path>
//                     </g>
//                 </g>
//             </g>
//         </svg>
//     );
// };

// const createStyles = (thumbnail) => {
//     return {
//         background: `
//             linear-gradient(
//                 rgba(0, 0, 0, 0),
//                 rgba(0, 0, 0, 0)
//             ),
//             url(${thumbnail})
//         `,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//     };
// };

// function GenericVideoFacade({ videoURL, thumbnail, border, style }) {
//     const [loading, setLoading] = useState(false);
//     const [show, setShow] = useState(false);

//     return (
//         <div
//             className={`facade-div ${border ? `facade-border` : ``}`}
//             style={style == null ? (show ? createStyles(undefined) : createStyles(thumbnail)) : style}
//             onClick={() => {
//                 setShow(true);
//             }}>
//             {/* Conditionally render iframe or play button */}

//             {loading || show ? (
//                 <iframe
//                     className='facade-iframe'
//                     title='Video'
//                     style={{
//                         backgroundColor: '#000000',
//                         borderRadius: '25px'
//                     }}
//                     src={videoURL}
//                     allowFullScreen
//                     onLoad={() => {
//                         setLoading(false);
//                         setShow(true);
//                     }}
//                 />
//             ) : (
//                 <div position='relative'>
//                     <Image profile={docProfile} value={thumbnail.value} alt={thumbnail.alt} className={'image'} />
//                     <IconSVG />
//                 </div>
//             )}
//         </div>
//     );
// }

// function EmbedVideoFacade({ videoURL, thumbnail, border, style }) {
//     const [loading, setLoading] = useState(false);
//     const [show, setShow] = useState(false);

//     return (
//         <div
//             className={`facade-div ${border ? `facade-border` : ``}`}
//             style={{ ...style, position: 'relative' }}
//             onClick={() => {
//                 setShow(true);
//             }}>
//             {/* Conditionally render iframe or play button */}

//             {loading || show ? (
//                 <iframe
//                     width='100%'
//                     height='100%'
//                     style={{ borderRadius: '25px' }}
//                     src={`${videoURL}?autoplay=1`}
//                     frameborder='0'></iframe>
//             ) : (
//                 <div
//                     style={{
//                         position: 'relative',
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}>
//                     {/* background */}
//                     <Image profile={docProfile} value={thumbnail.value} alt={thumbnail.alt} className={'image'} />
//                     <IconSVG />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default function VideoFacade({ videoURL, thumbnail, border, style }) {
//     if (
//         videoURL.startsWith('https://www.youtube.com/embed/') ||
//         videoURL.startsWith('https://player.vimeo.com/') ||
//         videoURL.startsWith('https://www.youtube-nocookie.com/embed')
//     ) {
//         return EmbedVideoFacade({
//             videoURL,
//             thumbnail,
//             border,
//             style
//         });
//     } else {
//         return GenericVideoFacade({
//             videoURL,
//             thumbnail,
//             border,
//             style
//         });
//     }
// }
