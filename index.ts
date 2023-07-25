#!/usr/bin/env node
import cursor from "ipad-cursor"
import { IpadCursorConfig, ICursorType } from "ipad-cursor";
import { TagConfig, Iconfig } from ".";

/**
 * @param {*} config tag style config
 * @param {IpadCursorConfig} cursorConfig cursor normal config
 * @param {Function} effect other effect
 */
function init(config: TagConfig = {}, cursorConfig: IpadCursorConfig = {}, effect?: () => void): void {
    if (effect) {
        effect();
    }
    document.querySelectorAll('*').forEach(_ => (_ as HTMLElement).style.cursor = 'none');
    Object.keys(config).forEach(query => {
        bindAttr(query, config[query]);
    })
    cursor.initCursor(cursorConfig);
}
const setAttr = (item: Element | undefined, type: ICursorType, style: string | undefined): void => {
    item?.setAttribute('data-cursor', type);
    if (style) {
        item?.setAttribute('data-cursor-style', style);
    }
}
const bindAttr = (query: string, cfg: Iconfig): void => {
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
const bindAttrNested = (query: string, cfg: Iconfig): void => {
    const { type, style } = cfg;
    cfg = cfg.children as any;
    query = Object.keys(cfg)[0];
    document.querySelectorAll(query)?.forEach(p => {
        setAttr(p, type, style);
        bindAttr(query, cfg[query]);
    })
}

export default init;
