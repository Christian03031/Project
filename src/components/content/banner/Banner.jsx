import "./banner.css"
import { Fragment } from "react/jsx-runtime"
import { motion } from "motion/react"


export function Banner({ backgroundImage }) {
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
                // transition={{ duration: .5, delay: .5 }}
                >
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time
                </motion.p>

                <motion.button className="btn-banner" initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}
                    // viewport={{ once: true }}
                    whileHover={{ scale: 1.1, transition: { duration: .1, delay: 0 } }}
                    while>View menu</motion.button>
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
                    <motion.button className="btn-banner" initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}
                        // viewport={{ once: true }}
                        whileHover={{ scale: 1.1, transition: { duration: .1, delay: 0 } }} viewport={{ once: true }}>Explore Story</motion.button>
                </div>
            </div>


        </section>
    </Fragment>
}