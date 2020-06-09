export interface Translation {
    _id: object;
    videoId: string; 
    scripts: [
            {
                raw:string,
                translations: [
                        {
                                userId:String,
                                translated:String,
                                votes:[]
                        }
                    ]
            }
    ];
}
