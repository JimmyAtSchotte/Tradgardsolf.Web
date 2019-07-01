import IApi from '@/core/interfaces/IApi';
import Player from '@/core/api/entities/Player';
import CredentialsModel from '@/core/api/models/CredentialsModel';

export default class AuthenticationController {
    private readonly api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    public async AuthenticateWithCredentials(model: CredentialsModel): Promise<Player> {
       return await this.api.postAsync<Player, CredentialsModel>('api/authentication/AuthenticateWithCredentials', model);
    }

    public SignOut(): void {
        this.api.get('api/authentication/SignOut');
     }
}


