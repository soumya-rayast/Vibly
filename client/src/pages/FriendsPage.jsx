import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import PageLoader from "../Components/PageLoader";
import NoFriendsFound from "../Components/NoFriendsFound";
import FriendCard from "../Components/FriendCard";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">All Friends</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <PageLoader />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
