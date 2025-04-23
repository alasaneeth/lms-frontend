import { GENDER } from "../Constants/Gender";

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
