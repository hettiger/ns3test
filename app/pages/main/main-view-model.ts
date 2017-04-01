import { Observable } from 'data/observable';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListView } from "tns-core-modules/ui/list-view";
import { IListItem } from "../../models/contracts/list-item-interface";
import { ListItem } from "../../models/list-item";
import { IThreads } from "../../models/contracts/threads-interface";
import { IThread } from "../../models/contracts/thread-interface";

export class MainViewModel extends Observable {

    private _listView: ListView;
    private _isLoading: boolean = true;
    private _items: ObservableArray<IListItem>;

    constructor(listView: ListView) {
        super();

        this._listView = listView;
        this._listView.opacity = 0;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this.isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange("isLoading", value);
        }
    }

    private addListItem(templateKey: string, item?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._items.push(new ListItem(templateKey, item));
            resolve();
        });
    }

    private fetchThreads(topic: string, templateKey: string): Promise<any> {
        return fetch("https://www.reddit.com/r/" + topic + ".json")
            .then((response) => response.json())
            .then((jsonObject: any) => {
                return new Promise((resolve, reject) => {
                    let threads = <IThreads>jsonObject;

                    threads.data.children.forEach((child) => {
                        let thread: IThread = child.data;

                        if (   thread.thumbnail.length
                            && thread.thumbnail.match(/^https?:\/\//i)
                            && thread.url.length
                            && thread.title.length)
                        {
                            this._items.push(new ListItem(templateKey, thread));
                        }
                    });

                    resolve();
                });
            })
            .catch((error) => {
                return new Promise((resolve, reject) => reject(error));
            });
    }

    get items(): ObservableArray<IListItem> {
        if ( ! this._items) {
            this._items = new ObservableArray() as ObservableArray<IListItem>;

            this.addListItem("nativescript-header")
                .then(() => this.fetchThreads("nativescript", "nativescript"))
                .then(() => this.addListItem("typescript-header"))
                .then(() => this.fetchThreads("typescript", "typescript"))
                .then(() => {
                    this.isLoading = false;

                    this._listView.animate({
                        opacity: 1,
                        duration: 600
                    });
                });
        }

        return this._items;
    }

}
