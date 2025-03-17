"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import Image from "next/image";
import Bell from "@/app/assets/Vector.png";
import Ellipse from "@/app/assets/Illustration.png"

export default function Home() {
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleTestNotification = async () => {
    const response = await fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/contact",
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="h-screen bg-gradient-to-b from-[#2C2143] to-[#000000] flex flex-col items-center justify-center">

      <div className="justify-center text-center">
        {notificationPermissionStatus === "granted" ? (
          <p className="text-white">Permission to receive notifications has been granted.</p>
        ) : notificationPermissionStatus !== null ? (
          <p className="text-white">
            You have not granted permission to receive notifications. Please
            enable notifications in your browser settings.
          </p>
        ) : null}
      </div>

      <div className="relative ">
        <Image src={Ellipse} alt="Ellipse Image" className="" />
        <Image src={Bell} alt="Bell Image" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="text-center text-white">
        <h1 className="text-2xl font-bold">Lorem Ipsum...</h1>
        <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet.</p>
      </div>


      <Button
        disabled={!token}
        className="mt-6 px-8 py-3 bg-[#1a0b30] text-white rounded-lg border-2 border-[#7c3aed] hover:bg-[#2c2143]"
        onClick={handleTestNotification}
      >
        Send Notification
      </Button>
    </main>
  );
}
