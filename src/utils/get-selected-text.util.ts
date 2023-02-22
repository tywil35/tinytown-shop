export const GetSelectedText = (): string => {
    if (window.getSelection) {
        return window.getSelection()?.toString() ?? '';
    }
    else if (document.getSelection) {
        return document.getSelection()?.toString() ?? '';
    } else { return ''; }
}