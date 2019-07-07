import React from 'react'
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fade,
    TextField, Typography
} from "@material-ui/core";
import Http from "../../serverApi/http";

interface DialogLoginFormProps {
    mobile: boolean
}

interface DialogLoginFormState {
    openDialogWindow: boolean,
    email: string,
    password: string,
    isLoading: boolean
}

export class DialogLoginForm extends React.Component<DialogLoginFormProps, DialogLoginFormState> {

    state = {
        openDialogWindow: false,
        email: '',
        password: '',
        isLoading: false
    };

    public handleOpenLoginDialog = () => {
        this.setState({
            openDialogWindow: true
        })
    };

    public handleClose = () => {
        this.setState({
            openDialogWindow: false,

        })
    };

    public login = () => {
        this.setState({
            isLoading: true
        });
        const http = new Http();
        const data = {
            email: this.state.email,
            password: this.state.password,

        };
        http.postConfig(data, '/auth')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false
                    })
                },
                (error) => {
                    console.log(error)
                }
            );


    };

    public handleEmailChange = (event: any) => {
        this.setState({
            email: event.target.value
        })
    };

    public handlePasswordChange = (event: any) => {
        this.setState({
            password: event.target.value
        })
    };

    public render() {
        return (
            <div>

                {this.props.mobile === true ?
                    <div onClick={this.handleOpenLoginDialog} style={{height: '2rem', width: '7rem'}}>
                        <Typography variant="button">Вход</Typography>
                    </div>
                    :
                    <Button color="secondary" onClick={this.handleOpenLoginDialog}>
                        Вход
                    </Button>}

                <Dialog open={this.state.openDialogWindow} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Fade
                            in={this.state.isLoading}
                            style={{
                                transitionDelay: this.state.isLoading ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                        >
                            <CircularProgress/>
                        </Fade>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            Введите логин (email) и пароль
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label={<Typography>Email <span style={{color: 'red'}}>*</span></Typography>}
                            type="email"
                            fullWidth
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label={<Typography>Пароль <span style={{color: 'red'}}>*</span></Typography>}
                            type="password"
                            fullWidth
                            onChange={this.handlePasswordChange}
                        />
                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.login} color="primary">
                            Войти
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
