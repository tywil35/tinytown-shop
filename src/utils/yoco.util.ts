export const LoadYocoExternalScript = () => {
    const yoco = document.createElement('script')
    yoco.id = 'yoco-scripts'
    yoco.setAttribute('src', 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js')
    document.head.appendChild(yoco)
};

export const RemoveYocoExternalScript = () => {
    const yoco = document.getElementById('yoco-scripts');
    if (yoco) {
        yoco.remove();
    }
};