export class User {
    constructor(
        public id: string = "",
        public name: string = "",
        public desc: string = "",
        public reviews = [],
        public watchlist = [],
        public memberSince = ""
    ) {}
}
