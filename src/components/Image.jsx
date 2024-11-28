import { IKImage } from "imagekitio-react"

const Image = ({ src, className, w, h, alt }) => {
    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IK_IMAGEKIT_URL_ENDPOINT}
            path={`blogApp/${src}`}
            alt={alt}
            className={className}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
            width={w}
            height={h}
        />
    )
}

export default Image