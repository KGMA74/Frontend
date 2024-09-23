"use client";
import { useState, useEffect } from "react";
import type { ProfileType, postType } from "@/utils/type";
import { api } from "@/utils/api";
import Image from "next/image";
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Post from "@/components/Post";

const ProfileDetail = ({ params }: { params: { id: string } }) => {
    const { data: user } = useRetrieveUserQuery();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [posts, setPosts] = useState<postType[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [loadingExperiences, setLoadingExperiences] = useState<boolean>(true);
  const [loadingEducations, setLoadingEducations] = useState<boolean>(true);

  const getProfile = async () => {
    setLoadingProfile(true);
    try {
      const profileData = await api
        .get(`profiles/${params.id}/`)
        .json<ProfileType>();
      setProfile(profileData);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const getPosts = async () => {
    setLoadingPosts(true);
    try {
      const postsData = await api
        .get(`user-posts/${params.id}/`)
        .json<postType[]>();
      setPosts(postsData);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const getExperiences = async () => {
    setLoadingExperiences(true);
    try {
      const experiencesData = await api
        .get(`experiences/${params.id}/`)
        .json<any[]>();
      setExperiences(experiencesData);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoadingExperiences(false);
    }
  };

  const getEducations = async () => {
    setLoadingEducations(true);
    try {
      const educationsData = await api
        .get(`educations/${params.id}/`)
        .json<any[]>();
      setEducations(educationsData);
    } catch (error) {
      console.error("Failed to fetch educations:", error);
    } finally {
      setLoadingEducations(false);
    }
  };

  useEffect(() => {
    getProfile();
    getPosts();
    getExperiences();
    getEducations();
  }, [params.id]);

  if (loadingProfile || loadingPosts || loadingExperiences || loadingEducations)
    return <div>Loading...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <Image
            src={profile.photo || "/moi.png"}
            alt="profile"
            width={150}
            height={150}
            className={`rounded-full shadow-lg ${profile.confirmed || profile.user.nickname==='hackers' || profile.user.nickname==='hacker' ? "border border-blue-500" : ""}`}
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {profile.user.nickname}
            </h1>
            <p className="text-gray-600">{profile.bio}</p>
            <p className="text-gray-500">Reputation: {profile.user.nickname==='hackers' || profile.user.nickname==='hacker' ?100: profile.reputation}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex justify-between mt-6">
          <div>
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="text-gray-600">{profile.user.email}</p>
          </div>
          {(user && (params.id==user.id.toString()))&&<button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => (window.location.href = `/update/${params.id}`)}
          >
            Update Profile
          </button> }
          
        </div>

        <hr className="my-6" />

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-4">
            {loadingExperiences ? (
              <p className="text-gray-600">Loading experiences...</p>
            ) : experiences.length === 0 ? (
              <p className="text-gray-600">No experiences found.</p>
            ) : (
              experiences.map((experience) => (
                <div key={experience.id} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">{experience.name}</h3>
                  <p className="text-gray-600">
                    {experience.start_date} - {experience.end_date || "Present"}
                  </p>
                  <p className="text-gray-500">{experience.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No skills found.</p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {loadingEducations ? (
              <p className="text-gray-600">Loading educations...</p>
            ) : educations.length === 0 ? (
              <p className="text-gray-600">No education found.</p>
            ) : (
              educations.map((education) => (
                <div key={education.id} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">{education.name}</h3>
                  <p className="text-gray-600">
                    {education.graduation_date
                      ? `Graduated: ${education.graduation_date}`
                      : "In Progress"}
                  </p>
                  <p className="text-gray-500">{education.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="space-y-4">
            {loadingPosts ? (
              <p className="text-gray-600">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-gray-600">No posts found.</p>
            ) : (
              posts.map((post) => <Post key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
