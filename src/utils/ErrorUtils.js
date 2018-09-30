import {
    Toast
} from 'native-base';

export function handleError(error) {
    //alert(error)
    if (error.response) {
        console.log(error)
        const messages = error.response.data.messages
        if (Array.isArray(messages) && messages.length > 0) {
            messages.forEach((message) => {
                Toast.show({
                    text: message,
                    type: "danger",
                    buttonText: "Okay",
                    duration: 3000
                });
            });
        } else {
            Toast.show({
                text: "Unknown error while processing your request",
                type: "danger",
                buttonText: "Okay",
                duration: 3000
            });
        }
    }
}