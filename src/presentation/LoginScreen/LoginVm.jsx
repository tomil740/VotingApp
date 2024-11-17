class LoginVm{
    repository;
    uiState;
    #onSignIn;

    constructor(repo,initUiState,onSignIn){
        this.#onSignIn = onSignIn;
        this.repository = repo;
        this.uiState = initUiState;
    }

    /*
    will take the uiState data and send it to server 
        * the server will return the user on secess or an mock user with error message
        * we will update the Ui accordingly
    */
    onSignIn(email,passWord){
        const res = this.repository.signIn(email,passWord);
        //on secusess
        if(res.id != -1){
            this.#onSignIn();
        }else{
            this.uiState = {...this.uiState,errorMesE:res.email,errorMesP:res.passWord,genErrorMes:res.name}
        }
    }
}

export default LoginVm;