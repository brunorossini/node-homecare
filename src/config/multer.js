import AWS from 'aws-sdk';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import { extname } from 'path';

const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

export default {
  storage: multerS3({
    s3,
    bucket: process.env.SPACES_BUCKET,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
