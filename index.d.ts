import { ICursorType } from "ipad-cursor"
export interface Iconfig {
    type: ICursorType,
    style?: string
    children?: TagConfig
}

export type TagConfig = {
    [key: string]: Iconfig
}