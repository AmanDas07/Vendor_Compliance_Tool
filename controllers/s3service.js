import { readFileSync } from 'fs';
import { basename } from 'path';
import { v4 as uuidv4 } from 'uuid';
import pkg from 'aws-sdk';

const { config, S3 } = pkg;

config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new S3();

const uploadFile = async (req, res) => {
    const fileContent = readFileSync(req.body.filePath);
    // const fileId = uuidv4();
    const fileKey = `${fileId}-${basename(req.body.filePath)}`;
    const params = {
        Bucket: req.body.bucketName,
        Key: fileKey,
        Body: fileContent,
    };

    const data = await s3.upload(params).promise();
    return (res.status(200).json({
        //fileId,
        filePath: data.Location,
        fileName: basename(filePath),
        fileKey,
    }));
};

const getFile = async (req, res) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: req.body.fileKey,
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body;
    } catch (err) {
        throw new Error(`Error getting file: ${err.message}`);
    }
};

const deleteFile = async (req, res) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: req.body.fileKey,
    };

    try {
        return await s3.deleteObject(params).promise();
    } catch (err) {
        throw new Error(`Error deleting file: ${err.message}`);
    }
};

const updateFile = async (req, res) => {
    try {
        await deleteFile(req.body.fileKey);
        const newFileUrl = await uploadFile(req.body.filePath, req.body.bucketName);
        return newFileUrl;
    } catch (err) {
        throw new Error(`Error updating file: ${err.message}`);
    }
};

export { uploadFile, getFile, deleteFile, updateFile };
