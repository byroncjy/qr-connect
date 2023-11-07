import express from 'express';
import path from 'path';
import cors from 'cors';
import jsQR from 'jsqr';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { createCanvas, loadImage } from 'canvas';




const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors()); // allow cross-origin resource sharing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../front-end/public')));



app.get('/ScanCode', (req, res) => {
          const LogoUrl = "https://picsum.photos/200/300";
          res.json({ LogoUrl }); 
});

app.post('/ScanCode', async (req, res) => {
          const { qrData } = req.body;
          const base64Data = qrData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
   
        
          try {
                    const image = await loadImage(`data:image/png;base64,${base64Data}`);
                    // Create canvas
                    const canvas = createCanvas(image.width, image.height);
                    const context = canvas.getContext('2d');
                    // Draw the image onto the canvas
                    context.drawImage(image, 0, 0);
                
                    // Get image data from canvas
                    const imageData = context.getImageData(0, 0, image.width, image.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
        
            if (code) {
              res.json({ qrCodeText: code.data });
            } else {
              res.status(400).send('No QR code found.');
            }
          } catch (error) {
            console.error(error);
            res.status(500);
          }
        });
        


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








