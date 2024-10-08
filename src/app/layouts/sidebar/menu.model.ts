export interface MenuItem {
    id?: any;
    label?: any;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    roles?:  any[];
    service?: any[];
    isLayout?: boolean;
}