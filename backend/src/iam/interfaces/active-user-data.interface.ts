import { Role } from "src/users/enums/role.enum";

export interface ActiveUserData {

    // The 'subject' of the token.  The value is the user ID that granted this token
     sub: number;

     email: string;

     role: Role;
}