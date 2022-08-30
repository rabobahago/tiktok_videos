import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import NoResults from "./NoResults";
interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}
const Comments = ({
  comments,
  comment,
  addComment,
  setComment,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <div key={idx}>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div>
                            <Image
                              src={user.image}
                              width={50}
                              height={50}
                              className="rounded-full"
                              alt="user profile"
                            />
                          </div>
                          <div className="hidden cursor-pointer">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replace(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>{item.comment}</div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="No comment yet" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-white px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-black-200 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              className="text-md text-white-500 bg-[#F51997] p-2 rounded text-semibold"
              onClick={addComment}
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Comments;
