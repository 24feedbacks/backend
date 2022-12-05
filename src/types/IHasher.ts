export default interface IHasher {
    hash: (password: string) => Promise<string | undefined>;
    compare: (password: string, hash: string) => Promise<boolean>;
}
