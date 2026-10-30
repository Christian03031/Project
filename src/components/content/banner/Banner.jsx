import "./banner.css"
import { Fragment } from "react/jsx-runtime"
import { motion } from "motion/react"
import { useNavigate } from "react-router"
import { Soup, Truck, FaceSlightlySmiling, Check} from "lucide-react"

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
                    <motion.button className="btn-banner" initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: .5, delay: .8 } }}
                        // viewport={{ once: true }}
                        whileHover={{ scale: 1.1, transition: { duration: .1, delay: 0 } }} viewport={{ once: true }}>Explore Story</motion.button>
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
                viewport={{ once: true, amount: 0.3 }}>
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
                staggerChildren: .7
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
                    viewport={{ once: true, amount: 0.3 }}
                    variants={parentVariants}>
                    <motion.h2 variants={childrenVariants}>Cooked By The Best Chefs In the Word</motion.h2>
                    <motion.p variants={childrenVariants}>Experience cuylinary ex cellence crafted by master chefs from around the globe. Our team of culinary virtuosos brings together expertise, innovation, and passion to create unforgettable dining experiences that redefine gastronomy.</motion.p>
                    <motion.span variants={childrenVariants}><Check color="white" strokeWidth=".22rem" style={{padding: ".2em", borderRadius: "6px", backgroundColor: "rgb(99, 177, 95)" }}/>Savour culinary brilliance from master chef worldwide.</motion.span>
                    <motion.span variants={childrenVariants}><Check color="white" strokeWidth=".22rem" style={{padding: ".2em", borderRadius: "6px", backgroundColor: "rgb(255, 62, 104)" }}/>Experience innovative creations with attention to detail.</motion.span>
                    <motion.span variants={childrenVariants}><Check color="white" strokeWidth=".22rem" style={{padding: ".2em", borderRadius: "6px", backgroundColor: "rgb(24, 90, 216)" }}/>Enjoy dishes crafted with an unwavering passion for perfection.</motion.span>
                </motion.div >
                <motion.div 
                initial={{opacity: 0, translate: "20px"}}
                whileInView={{opacity: 1, translate: 0, transition: {duration: .5, delay: .2}}} className="hero-container">
                    <img src={imageURL} alt="hero" />
                </motion.div>
            </motion.div>
        </section>
    </Fragment>
}