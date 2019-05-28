import IApi from '@/core/interfaces/IApi';
import AuthorizedPlayer from '@/core/api/entities/AuthorizedPlayer';
import CredentialsModel from '@/core/api/models/CredentialsModel';

export default class AuthenticationController {
    private readonly api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    public async AuthenticateWithCredentials(model: CredentialsModel): Promise<AuthorizedPlayer> {
       return await this.api.postAsync<AuthorizedPlayer, CredentialsModel>('api/authentication/AuthenticateWithCredentials', model);
    }

    public SignOut(): void {
        this.api.get('api/authentication/SignOut');
     }
}


