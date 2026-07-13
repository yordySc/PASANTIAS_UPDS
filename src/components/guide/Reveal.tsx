import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    delay?: number;
}

export default function Reveal({
    children,
    delay = 0
}: Props) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 80
            }}

            whileInView={{
                opacity: 1,
                y: 0
            }}

            viewport={{
                once: true,
                amount: 0.2
            }}

            transition={{
                duration: .8,
                delay
            }}

        >

            {children}

        </motion.div>

    );

}