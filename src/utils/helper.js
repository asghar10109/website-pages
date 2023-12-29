export const handleNumberInput = (e) => {
    const regex = /[0-9]/; // Regular expression to allow only numbers
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
};