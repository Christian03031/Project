import "./banner.css"
import { Fragment } from "react/jsx-runtime"
import { motion } from "motion/react"
import { useNavigate } from "react-router"
import { Soup, Truck, FaceSlightlySmiling, Check } from "lucide-react"

import Facebook from "../../../assets/logos/socials/facebook.svg?react"
import Instagram from "../../../assets/logos/socials/instagram.svg?react"
import Vk from "../../../assets/logos/socials/vk.svg?react"
import X from "../../../assets/logos/socials/x.svg?react"

export function Banner({ backgroundImage }) {

    const navigate = useNavigate();

    return <Fragment>
        <div
            className="banner"
            style={{
                "--banner-image": `url(${backgroundImage})`
            }}
        >
            <div className="content">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .5, delay: .5 }}
                >
                    Welcome to Pechehod !
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}
                    viewport={{ once: true }}
                >
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time
                </motion.p>

                <motion.button className="btn-banner" initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}
                    whileHover={{ scale: 1.1, transition: { duration: .1, delay: 0 } }}
                    viewport={{ once: true }}
                    while onClick={(e) => navigate('/menu')}>View menu</motion.button>
            </div>
        </div>
    </Fragment >
}

export function Section1({ imageURL }) {
    return <Fragment>
        <section className="landing-2">
            <div className="container">
                <motion.div className="img-container" viewport={{ once: true }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}><img src={imageURL} alt="dish image" /></motion.div>
                <div className="infos-container">
                    <motion.h2 initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .5, delay: .5 }}>We Serve Healthy & Tasty Food</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}
                        viewport={{ once: true }}>Indulge guilt-free with our commitment to serving wholesome and delicious meals. Explore a menu curated to balance taste and nutrition, ensuring every bite is both satisfying and nourishing.</motion.p>
                </div>
            </div>


        </section>
    </Fragment>
}

export function Section2({ imageURL }) {

    const parentVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: .7
            }
        }
    }

    const childrenVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };


    return <Fragment>
        <section className="landing-3">
            <motion.div
                variants={parentVariants}
                initial="hidden"
                whileInView="show"
                className="container"
                viewport={{ once: true, amount: .2 }}>
                <motion.div className="landing-card"
                    variants={childrenVariants}>
                    <div className="logo" style={{ backgroundColor: "rgb(99, 177, 95)", boxShadow: "0 0 10px rgb(99, 177, 95)" }}>
                        <Soup size="2rem" color="white" fill="white" /></div>
                    <h2>Order your Food</h2>
                    <p>Seamlessly place your food orders online with just a few clicks. Enjoy convenience and efficiency as you select from our diverse menu of delectable dishes.</p>
                </motion.div>
                <motion.div
                    variants={childrenVariants}
                    className="landing-card">

                    <div className="logo"
                        style={{ backgroundColor: "rgb(255, 62, 104)", boxShadow: "0 0 10px rgb(255, 62, 104)" }}
                    ><Truck size="2rem" color="white" fill="white" /></div>
                    <h2>Pick your Food</h2>
                    <p>Customize your dining experience by choosing from a tantalizing array of options. For savory, sweet, or in between craving, find the perfect meal to satisfy your appetite.</p>
                </motion.div>
                <motion.div
                    variants={childrenVariants}
                    className="landing-card">
                    <div className="logo"
                        style={{ backgroundColor: "rgb(24, 90, 216)", boxShadow: "0 0 10px rgb(24, 90, 216)" }}
                    ><FaceSlightlySmiling size="2rem" color="white" /></div>
                    <h2>Enjoy your Food</h2>
                    <p>Sit back, relax, and savor the flavors as your meticulously prepared meal arrives. Delight in the deliciousness of every bite, knowing that your satisfaction is our top priority.</p>
                </motion.div>
            </motion.div>
        </section>
    </Fragment>
}

export function Section3({ imageURL }) {

    const parentVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: .5
            }
        }
    }

    const childrenVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    return <Fragment>
        <section className="landing-4">
            <motion.div className="container">
                <motion.div className="text"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true}}
                    variants={parentVariants}>
                    <motion.h2 variants={childrenVariants}>Cooked By The Best Chefs In the Word</motion.h2>
                    <motion.p variants={childrenVariants}>Experience cuylinary ex cellence crafted by master chefs from around the globe. Our team of culinary virtuosos brings together expertise, innovation, and passion to create unforgettable dining experiences that redefine gastronomy.</motion.p>
                    <motion.span variants={childrenVariants}><Check color="white" strokeWidth=".22rem" style={{ padding: ".2em", borderRadius: "6px", backgroundColor: "rgb(99, 177, 95)" }} />Savour culinary brilliance from master chef worldwide.</motion.span>
                    <motion.span variants={childrenVariants}><Check color="white" strokeWidth=".22rem" style={{ padding: ".2em", borderRadius: "6px", backgroundColor: "rgb(255, 62, 104)" }} />Experience innovative creations with attention to detail.</motion.span>
                    <motion.span variants={childrenVariants}><Check color="white" strokeWidth=".22rem" style={{ padding: ".2em", borderRadius: "6px", backgroundColor: "rgb(24, 90, 216)" }} />Enjoy dishes crafted with an unwavering passion for perfection.</motion.span>
                </motion.div >
                <motion.div
                    initial={{ opacity: 0, translate: "20px" }}
                    viewport={{ once: true, amount: 1 }}
                    whileInView={{ opacity: 1, translate: 0, transition: { duration: .5 } }} className="hero-container">
                    <img src={imageURL} alt="hero" />
                </motion.div>
            </motion.div>
        </section>
    </Fragment>
}

export function Map() {

    return <div className="map-container">
        <iframe className="map-content" src="https://yandex.com/map-widget/v1/org/peshekhod/53967922907/?ll=30.355170%2C59.943539&utm_source=share&z=16" width="560" height="400" frameborder="1" allowfullscreen="true" ></iframe></div>
}


export function Footer() {
    return <div className="footer">
        <section className="footer-section">
            <article className="footer-part-text">
                <div className="logo-container">
                    <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" />
                </div>
                <div className="footer-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste accusantium aliquam saepe corrupti sequi explicabo deleniti harum, aliquid repellendus minus maiores unde nihil veritatis! Nam sint vero dicta veritatis eum.
                </div>
                <div className="social-container">
                    <Facebook className="social-icon"/>
                    <Instagram className="social-icon"/>
                    <X className="social-icon"/>
                    <Vk className="social-icon"/>

                </div>
            </article>
            <article className="footer-part">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </article>

            <article className="footer-part">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+7-951-659-17-28</li>
                    <li>contact@tomato.com</li>
                </ul>
            </article>
        </section>
        <span className="footer-credits">Copyright 2024 © Pechehod.com – All Right Reserved.</span>
    </div>
}