import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success("Comment approved successfully");
        await fetchComments();
      } else {
        console.error("Failed to approve comment:", data.message);
        toast.error("Failed to approve comment");
      }
    } catch (error) {
      console.error("Error approving comment:", error);
      toast.error("An error occurred while approving the comment");
    }
  };

  const deleteComment = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4 p-2">
          <p className="font-medium">
            Are you sure you want to delete this comment?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-500 rounded-md text-white hover:bg-red-600"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const { data } = await axios.post(
                    "/api/admin/delete-comment",
                    {
                      id: _id,
                    }
                  );
                  if (data.success) {
                    toast.success("Comment deleted successfully");
                    await fetchComments();
                  } else {
                    console.error("Failed to delete comment:", data.message);
                    toast.error("Failed to delete comment");
                  }
                } catch (error) {
                  console.error("Error deleting comment:", error);
                  toast.error("An error occurred while deleting the comment");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4 font-medium text-gray-600">
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="tick icon"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt="delete icon"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            onClick={deleteComment}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
