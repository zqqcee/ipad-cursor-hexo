#!/usr/bin/env node
import cursor from "https://unpkg.com/ipad-cursor@latest"

/**
 * @param {*} config tag style config
 * @param {IpadCursorConfig} cursorConfig cursor normal config
 * @param {Function} effect other effect
 */
function init(config, cursorConfig, effect) {
    if (effect) {
        effect();
    }
    document.querySelectorAll('*').forEach(_ => _.style.cursor = 'none');
    if (config) {
        Object.keys(config).forEach(query => {
            bindAttr(query, config[query]);
        })
    }
    cursor.initCursor(cursorConfig);
}
const setAttr = (item, type, style) => {
    item?.setAttribute('data-cursor', type);
    if (style) {
        item?.setAttribute('data-cursor-style', style);
    }
}
const bindAttr = (query, cfg) => {
    const { type, style } = cfg;
    const selPath = query.split('>');
    if (selPath.length > 2) {
        return;
    }
    if (cfg.children) {
        bindAttrNested(query, cfg);
    } else if (selPath.length == 2) {
        document.querySelectorAll(selPath[0])?.forEach(p => {
            p.querySelectorAll(selPath[1])?.forEach(c => {
                setAttr(c, type, style);
            })
        })
    } else {
        document.querySelectorAll(query)?.forEach(_ => {
            setAttr(_, type, style);
        })
    }

}
const bindAttrNested = (query, cfg) => {
    const { type, style } = cfg;
    cfg = cfg.children;
    query = Object.keys(cfg)[0];
    document.querySelectorAll(query)?.forEach(p => {
        setAttr(p, type, style);
        bindAttr(query, cfg[query]);
    })
}

export default init;
