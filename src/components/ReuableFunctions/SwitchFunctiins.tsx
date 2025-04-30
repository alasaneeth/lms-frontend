import toast from "react-hot-toast";
import { GENDER } from "../Constants/Gender";
import { STATUS } from "../Constants/Status";

export const handleGender = (gender: number): string => {
    switch (gender) {
        case GENDER.MALE:
            return "Male";
        case GENDER.FEMALE:
            return "Female";
        case GENDER.OTHER:
            return "Other";
        default:
            return "";
    }
};

export const handleStatus = (status:number): string => {
    switch (status) {
        case STATUS.ACTIVE:
            return "Active"
        case STATUS.DROP_OUT:
            return "Drop Out"
        case STATUS.INACTIVE:
            return "Inactive";
        case STATUS.RESIGNED: 
            return "Resigned";
        case STATUS.SUSSPENDED:
            return "Suspended";
        case STATUS.TERMINATED : 
            return "Terminated"
         default:
            return ""

    }
}

