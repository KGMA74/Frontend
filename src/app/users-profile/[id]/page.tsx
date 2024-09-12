"use client";
import { useState, useEffect } from "react";
import type { ProfileType } from "@/utils/type";
import { api } from "@/utils/api";

const ProfileDetail = ({params}: {params: {id: string}}) => {
    const [profile, setProfile] = useState<ProfileType>();

    const getProfile = async () => {
        await api.get(`profiles/${params.id}`)
            .json<ProfileType>()
            .then((res) => setProfile(res))
            .catch((error) => console.error(error));
    };


    useEffect(() => {
        getProfile();
    }, []);

    return (
        <></>
    ); 
}

export default ProfileDetail;