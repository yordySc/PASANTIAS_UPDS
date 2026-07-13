import { BookOpen, Building2, CircleHelp, House, Lightbulb } from "lucide-react";

export default function MobileBottomNav() {

    return (

        <nav

            className="

            md:hidden

            fixed

            bottom-4

            left-1/2

            -translate-x-1/2

            z-50

            flex

            items-center

            gap-2

            rounded-full

            border

            border-white/30

            bg-white/90

            backdrop-blur-xl

            shadow-2xl

            px-3

            py-2

            "

        >

            <a href="#inicio" className="rounded-full p-3 hover:bg-sky-100">

                <House size={22}/>

            </a>

            <a href="#informacion" className="rounded-full p-3 hover:bg-sky-100">

                <BookOpen size={22}/>

            </a>

            <a href="/student" className="rounded-full p-3 hover:bg-sky-100">

                <Building2 size={22}/>

            </a>

            <a href="#consejos" className="rounded-full p-3 hover:bg-sky-100">

                <Lightbulb size={22}/>

            </a>

            <a href="#faq" className="rounded-full p-3 hover:bg-sky-100">

                <CircleHelp size={22}/>

            </a>

        </nav>

    );

}