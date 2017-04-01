import { Observable } from "tns-core-modules/data/observable";

export class DetailViewModel extends Observable {

    public title: string;
    public url: string;

    private _isLoading: boolean = true;

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this.isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange("isLoading", value);
        }
    }

}
