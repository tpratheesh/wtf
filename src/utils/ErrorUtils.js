import {
    Toast
} from 'native-base';
import { toastMessage } from './ToastUtils';
import ToastConstants from '../constants/ToastConstants';

export function handleError(error) {
    //alert(error)
    if (error.response) {
        console.log(error)
        const messages = error.response.data.messages
        if (Array.isArray(messages) && messages.length > 0) {
            messages.forEach((message) => {
                toastMessage(message, ToastConstants.DANGER);
            });
        } else {
            toastMessage("Unknown error while processing your request", ToastConstants.DANGER);
        }
    }
}