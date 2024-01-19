import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req) {

  const myS3client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });


  const formData = await req.formData();
  for (const fileInfo of formData) {
    const file = fileInfo[1]; 
    const name = Date.now().toString()+ file.name;
    const chunks = [];
    for await (const chunk of file.stream()){
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    await myS3client.send(new PutObjectCommand({
        Bucket: 'feedback-boardebis-uploads',
        Key: name,
        ACL: 'public-read',
        Body: buffer,
        ContentType: file.type,
    }));
    console.log('https://feedback-boardebis-uploads.s3.amazonaws.com/'+name);
}
  return Response.json('ok');
}