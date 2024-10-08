import { AppointmentForm } from "@/components/auth/AppointmentForm";
import Image from "next/image";
import Link from "next/link";

export default function NewAppointment() {
    return (
        <div className="flex h-screen max-h-screen">

            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                    src=""
                    height={1000}
                    width={1000}
                    alt="appointment"
                    className="mb-12 h-10 w-fit"
                    />

                    < AppointmentForm /> 

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 HelloDoctor
                        </p>
                        <Link href="/?admin=true" className="text-green-500">
                        </Link>
                    </div>
                </div>
            </section>

            <Image
            src=""
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[390%] bg-bottom">
            </Image>
        </div>
    )
}