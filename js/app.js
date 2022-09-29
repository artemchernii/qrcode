window.addEventListener('load', () => {
    const form = document.querySelector('#generate-form');
    const qr = document.querySelector('#qrcode');

    console.log('form', form);
    console.log('qr', qr);

    const onGenerateSubmit = (e) => {
        e.preventDefault();

        clearUi();
        const url = document.querySelector('#url').value;
        const size = document.getElementById('size').value;
        if (url === '') {
            alert('Please enter URL');
        } else {
            showSpinner();
            setTimeout(() => {
                hideSpinner();
                generateQrCode(url, size);
                setTimeout(() => {
                    createSaveBtn(qr.querySelector('img').src);
                }, 50);
            }, 1000);
        }

        console.log('size', size);
    };
    const generateQrCode = (url, size) => {
        const qrcode = new QRCode('qrcode', {
            text: url,
            width: size,
            height: size,
        });
    };
    const createSaveBtn = (saveUrl) => {
        const link = document.createElement('a');
        link.id = 'save-link';
        link.classList =
            'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
        link.href = saveUrl;
        link.download = 'qrcode';
        link.innerHTML = 'Save Image';
        document.getElementById('generated').appendChild(link);
    };
    const clearUi = () => {
        qr.innerHTML = '';
        const saveBtn = document.getElementById('save-link');
        if (saveBtn) saveBtn.remove();
    };

    const showSpinner = () => {
        document.querySelector('#spinner').style.display = 'block';
    };
    const hideSpinner = () => {
        document.querySelector('#spinner').style.display = 'none';
    };
    form.addEventListener('submit', onGenerateSubmit);
});
