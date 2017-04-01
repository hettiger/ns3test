import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { MainViewModel } from './main-view-model';
import { ListView } from "tns-core-modules/ui/list-view";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { topmost } from "tns-core-modules/ui/frame";
import { IListItem } from "../../models/contracts/list-item-interface";

let model: MainViewModel;

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    let listView = <ListView>page.getViewById("listView");

    model = new MainViewModel(listView);
    page.bindingContext = model;
}

export function onUnloaded(args: EventData) {
    model = undefined;
}

export function itemTemplateSelector(item: IListItem, index: number, items: ObservableArray<IListItem>): string {
    return item.templateKey;
}

export function onItemTap(args) {
    let item: IListItem = model.items.getItem(args.index);

    if ( ! item.templateKey.match(/header$/)) {
        topmost().navigate({
            moduleName: "pages/detail/detail-page",
            context: item.item
        });
    }
}
