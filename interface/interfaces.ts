export interface IUser {
    name: string;
    address: string;
}

export interface ISolutionHash {
    sentence:string;
    hash: string;
}

export interface IDefiHash {
    challenge_id: string;
    sentence: string;
}

export interface IDefiEncrypt {
    challenge_id:string;
    public_key:string;
    sentence:string;
}

export interface ISolutionEncrypt {
    sentence:string;
    ciphertext:string;
}

export interface IUserInfo{
    name:string;
    address:string;
    score:number;
}