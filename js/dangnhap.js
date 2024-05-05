const formLogin = document.querySelector('.tab-content .form-login');
const formRegister = document.querySelector('.tab-content .form-signup');

if(formRegister){
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        const formGroup = e.target.querySelectorAll('.form-group');
        const email = e.target.querySelector('.form-group .email-js');
        const password = e.target.querySelector('.form-group .password-js')
        const rePassword = e.target.querySelector('.form-group .rePassword-js');
        const emailError = formRegister.querySelector('.form-group .email');
        const pwdError = formRegister.querySelector('.form-group .password');
        const rePwdError = formRegister.querySelector('.form-group .rePassword');

        let ok = 1;
        if(email.value.trim() == ""){
            emailError.innerHTML = `Email không được để trống`;
            ok = 0;
        } else if(!email.value.match(/^[a-z]+[a-z0-9]+@[a-z0-9]{3,}.com$/i)){
            emailError.innerHTML = `Email phải có đinh dạng example@domain.com`;
            ok = 0;
        } else emailError.innerHTML = ``;

        if(password.value.trim() == ""){
            pwdError.innerHTML = `Mật khẩu không được để trống`;
            ok = 0;
        } else if(password.value.length < 5){
            pwdError.innerHTML = `Mật khẩu phải có độ dài ít nhất là 5 kí tự`;
            ok = 0;
        } else pwdError.innerHTML = ``;

        if(rePassword.value.trim() == ""){
            rePwdError.innerHTML = `Mật khẩu không được để trống`;
            ok = 0;
        }else if(!(password.value == rePassword.value)){
            rePwdError.innerHTML = `Mật khẩu không khớp! Vui lòng nhập lại`;
            ok = 0;
        } else rePwdError.innerHTML = ``;

        formGroup.forEach(formGroupItem => {
            const inputValue = formGroupItem.querySelector('input');
            inputValue.addEventListener('keyup', () => {
                formGroupItem.querySelector('span').innerHTML = ``;
            })
        })

        if(ok == 1){
            let accounts = [];
            const listAccounts = localStorage.getItem("user");
            if(listAccounts){
                JSON.parse(listAccounts).forEach(act => accounts.push(act));
            }
            accounts.push({
                email: email.value,
                password: password.value
            });
            localStorage.setItem("user", JSON.stringify(accounts));
            formRegister.submit();
        }
    })
    
}


if(formLogin){
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const formGroup = e.target.querySelectorAll('.form-group');
        const email = e.target.querySelector('.form-group .email-js');
        const password = e.target.querySelector('.form-group .password-js')
        const emailError = formLogin.querySelector('.form-group .email');
        const pwdError = formLogin.querySelector('.form-group .password');

        let accounts = [];
        let JSONAccount = localStorage.getItem('user');
        if(!JSONAccount){
            localStorage.setItem('user', JSON.stringify(accounts));
            JSONAccount = localStorage.getItem('user');
        }

        accounts = JSON.parse(JSONAccount);

        let ok = 1;

        if(email.value.trim() == ""){
            emailError.innerHTML = `Email không được để trống`;
            ok = 0;
        } else if(!email.value.match(/^[a-z]+[a-z0-9]+@[a-z0-9]{3,}.com$/i)){
            emailError.innerHTML = `Email phải có đinh dạng example@domain.com`;
            ok = 0;
        } 

        if(password.value.trim() == ""){
            pwdError.innerHTML = `Mật khẩu không được để trống`;
            ok = 0;
        } 

        if(ok == 1){
            let checkDN = 1;
            if(accounts.length > 0){
                let okTK = 0;
                let okMK = 0;
                accounts.forEach(account => {
                    if(email.value == account.email){
                        okTK = 1;
                    }
                    
                    if(password.value == account.password){
                        okMK = 1;
                    }
                })
                
                if (okTK == 0){
                    emailError.innerHTML = `Email này không tồn tại!`;
                    checkDN = 0;
                }
                
                if(okMK == 0){
                    pwdError.innerHTML = `Mật khẩu không chính xác!`;
                    checkDN = 0;
                }
    
                if(checkDN == 1){
                    localStorage.setItem('token', JSON.stringify("YES"));
                    formLogin.submit();
                }
            } else alert("Chưa có tài khoản nào đã đăng kí !!");

         }

        formGroup.forEach(formGroupItem => {
            const inputValue = formGroupItem.querySelector('input');
            inputValue.addEventListener('keyup', () => {
                formGroupItem.querySelector('span').innerHTML = ``;
            })
        })
    })
}