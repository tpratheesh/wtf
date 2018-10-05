import {
    Toast
} from 'native-base';

export function toastMessage(text, type) {
    Toast.show({
        text: text,
        type: type,
        buttonText: "Okay",
        duration: 3000
    });
}