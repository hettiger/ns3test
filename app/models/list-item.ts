import { IListItem } from "./contracts/list-item-interface";

export class ListItem implements IListItem {

    private _templateKey: string;
    private _item: any;

    constructor(templateKey: string, item: any) {
        this._templateKey = templateKey;
        this._item = item;
    }

    get templateKey(): string {
        return this._templateKey;
    }

    get item(): any {
        return this._item;
    }

}
