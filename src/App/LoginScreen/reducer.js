const reducer = (state, action) => {
    switch (action.action) {
        case 'onFocus':
            return {
                value: state.value,
                valid: state.valid,
                focus: true,
                type: state.type
            };
        case 'onBlur':
            return {
                value: state.value,
                valid: state.valid,
                focus: false,
                type: state.type
            };
        case 'setVal':
            let valid;
            switch (state.type) {
                case 'login':
                    valid = loginCheck(action.value);
                    break;
                case 'password':
                    valid = passwordCheck(action.value);
                    break;
                default:
                    valid = secondPasswordCheck(action.value, action.sec);
                    break;
            }
            return {
                value: action.value,
                valid: valid,
                focus: state.focus,
                type: state.type
            };
    }

}

const secondPasswordCheck = (value, secondValue) => {
    return (value === secondValue) ? (true) : ('Passwords are different');
}

const passwordCheck = (value) => {
    const passwordIsValid = [
        value.length >= 8,
        /[0-9]/.test(value)
    ];
    let text = '';
    passwordIsValid.map((element, index) => {
        if (element !== true) {
            let errorValue = '';
            switch (index) {
                case 0:
                    errorValue = 'Password is to short';
                    break;
                case 1:
                    errorValue = 'Password must contain numbers';
                    break;
            }
            text += errorValue + '\n';
        }
    });
    return text.length === 0 ? true : text;
}

const loginCheck = (value) => {
    const loginIsValid = [
        value.length >= 5,
        !value.includes('.')
    ];
    let text = '';
    loginIsValid.map((element, index) => {
        if (element !== true) {
            let errorValue = '';
            switch (index) {
                case 0:
                    errorValue = 'Login is to short';
                    break;
                case 1:
                    errorValue = "Login can't contain dot";
                    break;
            }
            text += errorValue + '\n';
        }
    });
    return text.length === 0 ? true : text;
}

export default reducer;