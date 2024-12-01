import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostMenuAction = ({ post }) => {

    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const { isPending, error, data: savedPosts } = useQuery({
        queryKey: ['savedPosts'],
        queryFn: async () => {
            const token = await getToken();
            return await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    });

    //console.log("post", post)
    //console.log("user", user);
    const isAdmin = user?.publicMetadata?.role === "admin" || false;
    const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;

    // Delet Post 
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            toast.success("Post deleted successfully!");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    // Save Post
    const queryClient = useQueryClient();

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.patch(
                `${import.meta.env.VITE_API_URL}/users/save`,
                {
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    // Feature Post
    const featureMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            return axios.patch(
                `${import.meta.env.VITE_API_URL}/posts/feature`,
                {
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
        },
        onError: (error) => {
            toast.error(error.response.data);
        },
    });


    const handleDelete = () => {
        deleteMutation.mutate();
    }

    const handleSave = () => {
        if (!user) {
            return navigate("/login");
        }
        saveMutation.mutate();
    };

    const handleFeature = () => {
        featureMutation.mutate();
      };
    

    return (
        <div>
            <h1 className='mt-8 mb-4 text-sm font-medium'>Actions</h1>
            {isPending ? (
                "Loading..."
            ) : error ? (
                "Saved post fecthing failed!"
            ) : (
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSave}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 40 40"
                        width="20px"
                        height="20px"
                    >
                        <path
                            d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
                            stroke="black"
                            strokeWidth="2"
                            fill={saveMutation.isPending
                                ? isSaved
                                    ? "none"
                                    : "black"
                                : isSaved
                                    ? "black"
                                    : "none"}
                        />
                    </svg>
                    <span>Save this Post</span>
                    {saveMutation.isPending && (
                        <span className="text-xs">(in progress)</span>
                    )}
                </div>)}
            {isAdmin && (
                <div
                    className="flex items-center gap-2 py-2 text-sm cursor-pointer"
                    onClick={handleFeature}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="20px"
                        height="20px"
                    >
                        <path
                            d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
                            stroke="black"
                            strokeWidth="2"
                            fill={
                                featureMutation.isPending
                                    ? post.isFeatured
                                        ? "none"
                                        : "black"
                                    : post.isFeatured
                                        ? "black"
                                        : "none"
                            }
                        />
                    </svg>
                    <span>Feature</span>
                    {featureMutation.isPending && (
                        <span className="text-xs">(in progress)</span>
                    )}
                </div>
            )}
            {user &&
                (post.user.username === user.username || isAdmin) &&
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleDelete}>
                    <svg width="23px" height="23px" viewBox="0 0 1024.00 1024.00" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.01024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#231815"></path><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#231815"></path></g></svg>
                    <span>Delete this Post</span>
                    {deleteMutation.isPending && <span className='text-xs'>(In progress...)</span>}
                </div>}
        </div>
    )
}

export default PostMenuAction