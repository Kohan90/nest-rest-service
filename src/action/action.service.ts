import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionService {

    /**
     * 
     * @returns 
     */
    async action() {
        return 'Action performed!';
    }

    /**
     * 
     * @returns 
     */
    async credentialsAction() {
        return 'Credentials action performed';
    }
}
