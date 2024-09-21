export function useValidate() {
    function validatePassword(password: string) {
        let strength = 0
        if (password.length >= 10) strength += 4
        else if (password.length >= 8) strength += 3
        else if (password.length > 7) strength += 2
        else if (password.length < 5) strength -= 3
        if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[\d]/.test(password) && /[!@#$%^&*()]/.test(password) && password.length > 7) strength += 4
        if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[\d]/.test(password) && /[!@#$%^&*()]/.test(password) && password.length > 4) strength += 3

        if (/^[A-Z]+$/.test(password) || /^[a-z]+$/.test(password) ||
            /^[\d]+$/.test(password) || /^[!@#$%^&*()]+$/.test(password)) strength -= 1

        //tests if the password has only two types of characters
        if (/[A-Z]/.test(password) && /[a-z]/.test(password) && !/[\d]/.test(password) && !/[!@#$%^&*()]/.test(password) ||
            /[A-Z]/.test(password) && !/[a-z]/.test(password) && /[\d]/.test(password) && !/[!@#$%^&*()]/.test(password) ||
            /[A-Z]/.test(password) && !/[a-z]/.test(password) && !/[\d]/.test(password) && /[!@#$%^&*()]/.test(password)) strength -= 1
        else if (!/[A-Z]/.test(password) && /[a-z]/.test(password) && /[\d]/.test(password) && !/[!@#$%^&*()]/.test(password) ||
            !/[A-Z]/.test(password) && /[a-z]/.test(password) && !/[\d]/.test(password) && /[!@#$%^&*()]/.test(password)) strength -= 1
        else if (!/[A-Z]/.test(password) && !/[a-z]/.test(password) && /[\d]/.test(password) && /[!@#$%^&*()]/.test(password)) strength -= 1

        return strength
    }

    return { validatePassword }
}