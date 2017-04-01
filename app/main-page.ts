import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { IListItem, MainViewModel } from './main-view-model';
import { ListView } from "tns-core-modules/ui/list-view";
import { ObservableArray } from "tns-core-modules/data/observable-array";

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    let listView = <ListView>page.getViewById("listView");

    page.bindingContext = new MainViewModel(listView);
}

export function itemTemplateSelector(item: IListItem, index: number, items: ObservableArray<IListItem>): string {
    return item.templateKey;
}
