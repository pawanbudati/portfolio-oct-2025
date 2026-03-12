import React, { useState, useRef, useEffect } from 'react';
import { navbarConfig } from "../../utils/config.jsx"

let allowNavbarChange = true;
const Navbar = () => {

    const disableNavbarChangeForOneSec = () => {
        allowNavbarChange = false;
        setTimeout(() => {
            allowNavbarChange = true;
        }, 1000);
    }

    const [activeNav, setActiveNav] = useState('#');

    const [bubbleStyle, setBubbleStyle] = useState({});

    const navRef = useRef(null);

    const itemRefs = useRef(new Map());

    const observerRef = useRef(null);

    useEffect(() => {
        const activeItemEl = itemRefs.current.get(activeNav);

        if (activeItemEl) {
            setBubbleStyle({
                width: activeItemEl.offsetWidth,
                transform: `translateX(${activeItemEl.offsetLeft - 10}px)`,
            });
        }
    }, [activeNav]);

    useEffect(() => {
        const initialActiveItem = itemRefs.current.get('#');
        if (initialActiveItem) {
            setBubbleStyle({
                width: initialActiveItem.offsetWidth,
                transform: `translateX(${initialActiveItem.offsetLeft - 10}px)`,
                transition: 'none'
            });

            setTimeout(() => {
                setBubbleStyle(prev => ({ ...prev, transition: '' }));
            }, 100);
        }

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && allowNavbarChange) {
                    if (entry.target.id === "hero") {
                        setActiveNav("#");
                    } else {
                        setActiveNav(`#${entry.target.id}`)
                    }
                }
            });
        }, { threshold: 0.35 });

        itemRefs.current.forEach((_, key) => {
            const selector = key === '#' ? '#hero' : key;
            const target = document.querySelector(selector);
            if (target) {
                observerRef.current.observe(target)
            }
        });

        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <>
            <nav ref={navRef} className="nav">
                <div className="bubble" style={{
                    width: bubbleStyle.width,
                    transform: bubbleStyle.transform,
                    transition: bubbleStyle.transition === 'none' ? 'none' : 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }} />
                {navbarConfig?.map(navItem => {
                    const { id, route, icon: Icon, title, tooltip } = navItem;
                    return (
                        <a
                            key={id}
                            href={route}
                            ref={(el) => itemRefs.current.set(route, el)}
                            onClick={() => { disableNavbarChangeForOneSec(); setActiveNav(route); }}
                            className={activeNav === route ? 'active' : ''}
                        >
                            <Icon className='section-icon' title={tooltip} />
                            <span className='section-title'>{title}</span>
                        </a>
                    );
                })}
            </nav>
        </>
    );
};

export default Navbar;
