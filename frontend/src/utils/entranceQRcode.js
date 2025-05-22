import QRCode from 'qrcode';
import fs from 'fs';

const url = `http://localhost:5173/checkin`;

QRCode.toFile('./public/entrance-qr.png', url, {
    width: 300,
}, function (err) {
    if (err) throw err;
    console.log('QR code generated and saved as entrance-qr.png');
});
