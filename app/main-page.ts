import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { MainViewModel } from './main-view-model';
import { ListView } from "tns-core-modules/ui/list-view";

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    let listView = <ListView>page.getViewById("listView");

    page.bindingContext = new MainViewModel(listView);
}
