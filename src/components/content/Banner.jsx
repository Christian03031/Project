import backgroundImage from "/src/assets/images/banner.webp"

export default function Banner(){
    return <div className="banner" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(10px)',
        }}>

    </div>
}