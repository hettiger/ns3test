import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { WebView } from "tns-core-modules/ui/web-view";
import { DetailViewModel } from "./detail-view-model";
import { isAndroid } from "tns-core-modules/platform";

let model: DetailViewModel;

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    let webView = <WebView>page.getViewById("webView");

    model = new DetailViewModel();
    model.title = page.navigationContext.title;
    model.url = page.navigationContext.url;
    page.bindingContext = model;

    if (isAndroid) {
        const settings = webView.android.getSettings();
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
    }
}

export function onUnloaded(args: EventData) {
    model = undefined;
}

export function onLoadStarted(args: EventData) {
    let webView = <WebView>args.object;

    model.isLoading = true;
    webView.opacity = 0;
}

export function onLoadFinished(args: EventData) {
    let webView = <WebView>args.object;

    model.isLoading = false;

    webView.animate({
        opacity: 1,
        duration: 600
    });
}
