import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';

const authenticator = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/upload-auth`
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({ children, type, setProgress, setData }) => {

    const ref = useRef(null);

    const onError = (error) => {
        console.log(error);
        toast.error("Upload failed");
    }

    const onSuccess = (res) => {
        console.log(res);
        setData(res)
    }

    const onUploadProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
    }


    return (
        <IKContext
            publicKey={import.meta.env.VITE_IK_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IK_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
        >
            <IKUpload
                useUniqueFileName
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                folder={"/blogApp"}
                className='hidden'
                ref={ref}
                accept={`${type}/*`}
            />
            <div className="cursor-pointer" onClick={() => ref.current.click()}>
                {children}
            </div>
        </IKContext>
    )
}

export default Upload