import { Observable } from 'data/observable';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListView } from "tns-core-modules/ui/list-view";

interface IThread {
    thumbnail: string;
    url: string;
    title: string;
}

interface IThreads {
    data: {
        children: [
            {
                kind: string;
                data: IThread;
            }
        ]
    }
}

export class MainViewModel extends Observable {

    private _listView: ListView;
    private _isLoading: boolean = true;
    private _threads: ObservableArray<IThread>;

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

    get threads(): ObservableArray<IThread> {
        if ( ! this._threads) {
            this._threads = new ObservableArray() as ObservableArray<IThread>;

            fetch("https://www.reddit.com/r/nativescript.json")
                .then((response) => response.json())
                .then((jsonObject: any) => {
                    let threads = <IThreads>jsonObject;

                    threads.data.children.forEach((child) => {
                        let thread: IThread = child.data;

                        if (   thread.thumbnail.length
                            && thread.thumbnail.match(/^https?:\/\//i)
                            && thread.url.length
                            && thread.title.length)
                        {
                            this._threads.push(thread)
                        }
                    });

                    this.isLoading = false;

                    this._listView.animate({
                        opacity: 1,
                        duration: 600
                    });
                });
        }

        return this._threads;
    }

}
