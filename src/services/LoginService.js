import { LoginService } from '../utils/ServerUtils';

export function generateOTP(mobileNo) {
    return LoginService({
        method: 'GET',
        url: '/otp/generate/' + mobileNo
    })
}

export function validateOTP(mobileNo, otp) {
    return LoginService({
        method: 'POST',
        url: '/login',
        data: {
            userName: mobileNo,
            password: otp
        }
    });
}