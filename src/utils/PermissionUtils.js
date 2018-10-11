import { PermissionsAndroid } from "react-native";
import Permission from "../constants/PermissionConstants";
export async function requestPermissions(permission) {
    try {
        var permissionReq = null;
        switch (permission) {
            case Permission.READ_CONTACTS:
                permissionReq = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
                break;
            case Permission.CAMERA:
                permissionReq = PermissionsAndroid.PERMISSIONS.CAMERA;
                break;
            case Permission.READ_SMS:
                permissionReq = PermissionsAndroid.PERMISSIONS.READ_SMS;
                break;
            default:
                break;
        }
        if (permissionReq != null) {
            var check = await PermissionsAndroid.check(permissionReq);
            if (!check) {
                const granted = await PermissionsAndroid.request(permissionReq);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return check;
            }
        }
    } catch (err) {
        console.warn(err);
    }
}