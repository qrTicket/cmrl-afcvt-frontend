export class PTO {
    id: Number;
    email: string;
    vendorName: string;
    name: string;
    roles: [
        {
            id: Number;
            name: String;
            roleName: String;
        }
    ];
    contact: string;
    mobileNumber: string;
    gstNumber: string;
    panNumber: string;
    username: string;
    password: string;
    confirmPassword: string;
    address: string;
    // state: string;
    createdDate: Date;
    verified: Boolean;
    rejected: Boolean;
    vendorGeneratedId: string;
    empId?:any;
}
