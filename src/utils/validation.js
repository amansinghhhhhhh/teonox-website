export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
};

export const validateFile = (file) => {

    if (!file) {
        return {
            valid: true
        };
    }

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            message: "Only PDF, DOC and DOCX files are allowed."
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            message: "Maximum file size is 5MB."
        };
    }

    return {
        valid: true
    };
};