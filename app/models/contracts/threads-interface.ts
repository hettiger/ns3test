import { IThread } from "./thread-interface";

export interface IThreads {
    data: {
        children: [
            {
                kind: string;
                data: IThread;
            }
            ]
    }
}
