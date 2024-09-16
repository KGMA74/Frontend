"use client";
import { useState, useEffect } from "react";
import type { ProfileType } from "@/utils/type";
import { api } from "@/utils/api";
import Image from "next/image";

const ProfileDetail = ({ params }: { params: { id: string } }) => {
    const [profile, setProfile] = useState<ProfileType | null>(null);

    const getProfile = async () => {
        await api.get(`profiles/${params.id}/`)
            .json<ProfileType>()
            .then((res) => setProfile(res))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                    <Image
                        src={profile.photo || '/moi.png'}
                        alt="profile"
                        width={150}
                        height={150}
                        className={`rounded-full shadow-lg ${profile.confirmed ? 'border border-blue-500' : ''}`}
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {profile.user.nickname}
                        </h1>
                        <p className="text-gray-600">{profile.bio}</p>
                        <p className="text-gray-500">Reputation: {profile.reputation}</p>
                    </div>
                </div>

                {/* Contact and location */}
                <div className="flex justify-between mt-6">
                    <div>
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                        <p className="text-gray-600">{profile.user.email}</p>
                    </div>
                    
                </div>

                <hr className="my-6" />

                {/* Experience Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    <div className="space-y-4">
                        {/* Add real experience data here */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Software Developer at XYZ Corp</h3>
                            <p className="text-gray-600">June 2020 - Present</p>
                            <p className="text-gray-500">Developed web applications and managed backend services.</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Intern at ABC Inc.</h3>
                            <p className="text-gray-600">Jan 2019 - May 2020</p>
                            <p className="text-gray-500">Assisted in software development projects and learned new technologies.</p>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* Add real skills data here */}
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">JavaScript</span>
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">React</span>
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Node.js</span>
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Django</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    <div className="space-y-4">
                        {/* Add real education data here */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Bachelor's in Computer Science</h3>
                            <p className="text-gray-600">University of Example - Graduated 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetail;
