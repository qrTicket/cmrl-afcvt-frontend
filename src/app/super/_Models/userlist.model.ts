export class UserList {
    id: Number;
    name: String;
    username: String;
    email: String;
    status: Number;
    blacklist: Boolean;
    roles: [
        {
            name: String;
        }
    ];
    createdDate: Date;
}
