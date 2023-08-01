
export interface IBreed {
    id: string;
    name: string;
}

export interface ICat {
    breeds: [
        {
            name: string, 
            description: string
        }
    ]
    url: string;
}
